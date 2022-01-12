const express = require('express');
const path = require('path');
const sequelize = require('./database');
const Inventory = require('./models/Inventory');
const Category = require('./models/Category');
const {mockData} = require('./data/mockData');
const { QueryTypes } = require('sequelize');
const bodyParser = require('body-parser');

const csv = require('fast-csv');
const fs = require('fs');
const ws = fs.createWriteStream('inventory_export.csv');

const dbConnect = sequelize.sync({ force: true }).then(() => console.log('Database is ready.'));

const app = express();

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








/* endpoints for form submission */

// create new product
app.post('/inventory', (req, res) => {
    Inventory.create({
        product_name: req.body.product_name,
        brand: req.body.brand,
        sku: req.body.sku,
        quantity: req.body.quantity,
        price: req.body.price,
        cost: req.body.cost,
        category_id: 1,
        ext_description: req.body.ext_description,
        product_img: req.body.product_img,
        ext_product_url: req.body.ext_product_url,
        int_notes: req.body.int_notes
    });
    res.send(req.body);
});

app.put('/inventory/:id', (req, res) => {
    const inventoryId = req.params.id;
    Inventory.set({
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
    res.send('Updated product, cool.');
});
















// start server and load mock data into db
app.listen(3000, async () => {
    loadData();
    console.log('Server started (http://localhost:3000/)');
});

// set view engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, '/views'));

// use static assets in public folder
app.use(express.static(path.join(__dirname, 'public')));


/* routing section */
// get home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Inventory Manager' });
});

// get read inventory page
app.get('/read', async (req, res) => {
    const db = await dbConnect;
    const inventory = await sequelize.query(`SELECT * FROM inventory i
        JOIN category c ON i.category_id = c.id`, { type: QueryTypes.SELECT });
    res.render('read', { title: 'View Current Inventory', inventory });
});


// get create inventory page
app.get('/create', async (req, res) => {
    const db = await dbConnect;
    const category = await Category.findAll();
    res.render('create', { title: 'Add New Inventory', category })
});


// get edit inventory page
app.get('/edit/:id', async (req, res) => {
    const inventoryId = req.params.id;
    const db = await dbConnect;
    const category = await Category.findAll();
    const inventory = await Inventory.findAll({ where: { id: inventoryId } });
    res.render('edit', { title: 'Edit Inventory', category, inventory})
})


const loadData = async () => {
    const db = await dbConnect;
    await Category.bulkCreate(mockData.category);
    await Inventory.bulkCreate(mockData.inventory);
    console.log('Mock data loaded successfully.');
};


// const exportData = async () => {
//     const db = await dbConnect;
    // const inventory = await Inventory.findAll();

    const jsonData = [ { id: 1,
        name: 'Node.js',
        description: 'JS web applications',
        created_at: '2021-09-02' },
      { id: 2,
        name: 'Vue.js',
        description: 'for building UI',
        created_at: '2021-09-05' },
      { id: 3,
        name: 'Angular.js',
        description: 'for building mobile & desktop web app',
        created_at: '2021-09-08' } ];

    csv
        .write(jsonData, { headers: true })
        .on('finish', () => {
            console.log('Finished writing to CSV.');
        })
        .pipe(ws);

// }
