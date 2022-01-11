const express = require('express');
const path = require('path');
const sequelize = require('./database');
const Inventory = require('./models/Inventory');
const Category = require('./models/Category');
const {mockData} = require('./data/mockData');
const { QueryTypes } = require('sequelize');

const dbConnect = sequelize.sync({ force: true }).then(() => console.log('Database is ready.'));

const app = express();

app.use(express.json());


// endpoints for inventory API
app.post('/api/inventory', async (req, res) => {
    await Inventory.create(req.body)
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
    const inventory = await Inventory.findOne({ where: { id: inventoryId }});
    inventory.quantity = req.body.quantity;
    await inventory.save();
    res.send('Updated quantity.');
});

app.delete('/api/inventory/:id', async (req, res) => {
    const inventoryId = req.params.id;
    await Inventory.destroy({ where: { id: inventoryId }});
    res.send('Deleted selected inventory.');
});

/* endpoints for form submission */

// create new product
app.post('/inventory', async (req, res) => {
    await Inventory.create(req.body)
    res.send('Inventory has been added successfully.');
    console.log('Added product successfully.');
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


const loadData = async () => {
    const db = await dbConnect;
    await Category.bulkCreate(mockData.category);
    await Inventory.bulkCreate(mockData.inventory);
    console.log('Mock data loaded successfully.');
};

