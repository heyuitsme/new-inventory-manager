const express = require('express');
const path = require('path');
const sequelize = require('./database');
const Inventory = require('./models/Inventory');
const Category = require('./models/Category');
const { mockData } = require('./data/mockData');
const { QueryTypes } = require('sequelize');
const bodyParser = require('body-parser');

const csv = require('fast-csv');
const fs = require('fs');
const res = require('express/lib/response');


const dbConnect = sequelize.sync({ force: true }).then(() => console.log('Database is ready.'));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// endpoints for inventory API
app.post('/api/inventory', async (req, res) => {
    await Inventory.create(req.body);
    res.send('Inventory has been added successfully.');
});

app.get('/api/inventory', async (req, res) => {
    const inventory = await Inventory.findAll();
    res.send(inventory);
});

app.get('/api/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id;
    const inventory = await Inventory.findOne({ where: { id: inventoryId }});
    res.send(inventory);
});

app.put('/api/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id;
    const product = await Inventory.findOne({ where: { id: inventoryId }});
    product.product_name = req.body.product_name;
    product.brand = req.body.brand;
    product.sku = req.body.sku;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.cost = req.body.cost;
    product.category_id = req.body.category_id;
    product.ext_description = req.body.ext_description;
    product.product_img = req.body.product_img;
    product.ext_product_url = req.body.ext_product_url;
    product.int_notes = req.body.int_notes;
    await product.save();
    res.send('Updated product successfully.');
});

app.delete('/api/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id;
    await Inventory.destroy({ where: { id: inventoryId }});
    res.send('Deleted selected inventory.');
});


app.post('/inventory', async (req, res) => {
    Inventory.create({
        product_name: req.body.product_name,
        brand: req.body.brand,
        sku: req.body.sku,
        quantity: req.body.quantity,
        price: req.body.price,
        cost: req.body.cost,
        category_id: req.body.category_id,
        ext_description: req.body.ext_description,
        product_img: req.body.product_img,
        ext_product_url: req.body.ext_product_url,
        int_notes: req.body.int_notes
    });

    res.render('success', { title: 'Success', message: 'Added new product successfully!'});
});


app.post('/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id;
    Inventory.update({
        product_name: req.body.product_name,
        brand: req.body.brand,
        sku: req.body.sku,
        quantity: req.body.quantity,
        price: req.body.price,
        cost: req.body.cost,
        category_id: req.body.category_id,
        ext_description: req.body.ext_description,
        product_img: req.body.product_img,
        ext_product_url: req.body.ext_product_url,
        int_notes: req.body.int_notes
    }, {
        where: {
            id: inventoryId
        }
    });

    res.render('success', { title: 'Success', message: 'Edited product successfully!' });
});


app.listen(3000, async () => {
    loadData();
    console.log('Server started (http://localhost:3000/)');
});


app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));


app.get('/', (req, res) => {
    res.render('index', { title: 'Inventory Manager' });
});


app.get('/read', async (req, res) => {
    const db = await dbConnect;
    const inventory = await sequelize.query(`SELECT * FROM inventory i
        JOIN category c ON i.category_id = c.id`, { type: QueryTypes.SELECT });
    res.render('read', { title: 'View Current Inventory', inventory });
});


app.get('/create', async (req, res) => {
    const db = await dbConnect;
    const category = await Category.findAll();
    res.render('create', { title: 'Add New Inventory', category })
});


app.get('/edit/:id', async (req, res) => {
    const inventoryId = req.params.id;
    const db = await dbConnect;
    const category = await Category.findAll();
    const inventory = await Inventory.findAll({ where: { id: inventoryId } });
    res.render('edit', { title: 'Edit Inventory', category, inventory})
});


app.get('/read/download', async (req, res) => {
    exportData();
    res.render('success', { title: 'Success', message: 'File has been downloaded to your default download folder.' });
})


const loadData = async () => {
    const db = await dbConnect;
    await Category.bulkCreate(mockData.category);
    await Inventory.bulkCreate(mockData.inventory);
    console.log('Mock data loaded successfully.');
};


const exportData = async () => {
    const db = await dbConnect;
    const inventory = await Inventory.findAll();

    const resArr = [];
    for (let i=0; i<inventory.length; i++) {
        resArr.push(inventory[i].dataValues);
    };

    let exportName = 'inventory_export.csv';
    let downloadDir = path.join(process.env.HOME || process.env.USERPROFILE, 'downloads/');
    let file_path = path.join(downloadDir,exportName);

    const ws = fs.createWriteStream(file_path);

    csv
        .write(resArr, { headers: true })
        .on('finish', () => {
            console.log('Finished writing to CSV.');
        })
        .pipe(ws);
};
