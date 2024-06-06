const express = require('express');
const Joi = require("joi");
const app = express();

const PORT = 5000;
app.use(express.json());

const products = [
    {id: 1, sku: "Iphone", name: "15 Pro Max"},
    {id: 2, sku: "Iphone", name: "14 Pro"},
    {id: 3, sku: "Iphone", name: "13 Pro"},
    {id: 4, sku: "Xiaomi", name: "Poco F5"},
    {id: 5, sku: "Xiaomi", name: "Poco M4 Pro"}
];

const productSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .required()
});

app.post('/api/products', (req, res) => {

    const validationResult = productSchema.validate(req.body);

    if (validationResult.error) {
        console.log(validationResult.error);

        res.status(400).send(validationResult.error.details)
        return;
    }


    const id = find(products);
    const products_numb = {
        id: id,
        sku: "sku " + id,
        name: req.body.name
    }


    products.push(products_numb)
    res.send(products_numb);
});


app.put('/api/products/:id', (req, res) => {

    const product = products.find(item => item.id == req.params.id)

    if (!product) {
        res.status(404).send(`Product with id: ${req.params.id} not found`)
    }
    const validationResult = productSchema.validate(req.body);

    if (validationResult.error) {
        console.log(validationResult.error.message);

        res.status(400).send(validationResult.error.details)
        return;
    }
    product.name = req.body.name;
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {

    const product = products.find(item => item.id == req.params.id)

    if (!product) {
        res.status(404).send(`Product with id: ${req.params.id} not found`)
    }

    const indexOfProduct = products.indexOf(product);
    products.splice(indexOfProduct, 1)
    res.status(200).send(product)
});


app.get('/', (req, res) => {
    console.log("Request is being processed");
    res.send(`Server port ${PORT}`);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(item => item.id == req.params.id)
    res.send(show_l(product, req, res));
});

app.get('/api/productAll', (req, res) => {
    let string_list = "";
    for (let j = 0; j < products.length; j++) {
        string_list += products[j].id + "МОДЕЛЬ ТЕЛЕФОНУ " + products[j].sku + " ВЕРСІЯ ПРОДУКТУ " + products[j].name + '<br>';
    }
    res.send(string_list);
});


function show_l(product, req, res) {

    if (product) {

        return (//'id: ' + product.id //+
            " МОДЕЛЬ ТЕЛЕФОНУ " + product.sku + " ВЕРСІЯ ПРОДУКТУ " + product.name);
    } else {
        res.status(404).send(`Product with id: ${req.params.id} not found`)
    }
}

function find(products) {
    let j = 0;
    for (let i = 0; i < products.length; i++) {
        if (i < products.length - 1 && products[i].id < products[i + 1].id) {
            j = products[i].id;
        } else {
            j = products[i].id;
        }
    }
    return j + 1;
}

app.listen(PORT, () => {
    console.log(`Local server starts listening on port: ${PORT}`);
});


//


// app.get('/product/item1', (req, res) => {
//         console.log("change to item1" );
//         res.send(products[0]);
// });
// app.get('/loh', (req, res) => {
//     console.log("change to /loh");
//     res.send(`Sasha loh`);
// });

// app.get('/api/product/:id/:sku', (req, res) => {
//     res.send(req.params.id + "  " + req.params.sku);
// });

