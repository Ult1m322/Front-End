const express = require("express");
const Joi = require('joi');
const Router = express.Router();
const products = [
    {id: 1, model: "Iphone", version: "15 Pro Max", cost: 5000, amount: 1},
    {id: 2, model: "Iphone", version: "14 Pro", cost: 4000, amount: 23},
    {id: 3, model: "Iphone", version: "13 Pro", cost: 3000, amount: 0},
    {id: 4, model: "Xiaomi", version: "Poco F5", cost:500, amount: 2},
    {id: 5, model: "Xiaomi", version: "Poco M4 Pro", cost: 400, amount: 5},

];
const ordered_product = [];
const productSchema = Joi.object({
    version: Joi.string()
        .min(1)
        .required(),

    model: Joi.string()
        .min(3)
        .required(),
    cost: Joi.string()
        .min(1)
        .required(),
    amount: Joi.string()
        .min(1)
        .required()
});
Router.route("/ordered_product")
    .get((req, res) => {
        res.send(ordered_product);
    })
Router.route("/ordered_product/:id")

Router.route("/")
    .get((req, res) => {

        res.send(products);
    })
    .post((req, res) => {
        const validationResult = productSchema.validate(req.body);

        if (validationResult.error) {
            console.log(validationResult.error);

            res.status(400).send(validationResult.error.details)
            return;
        }


        const id = find(products);
        const products_numb = {
            id: id,
            model: req.body.model,
            version: req.body.version,
            cost: req.body.cost,
            amount: req.body.amount,
        }
        products.push(products_numb)
        res.send(products_numb);
    })

Router.route("/:id")
    .get((req, res) => {
        const product = products.find(item => item.id == req.params.id)
        res.send(show_l(product, req, res));
    })
    .put((req, res) => {
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
        product.model = req.body.model;
        product.version = req.body.version;
        product.cost = req.body.cost;
        product.amount = req.body.amount;
        res.send(product);
    })
    .post((req, res) => {
        const productId = req.params.id;
        const product = products.find(item => item.id == productId);
        if (product.amount > 0) {
            const products_numb = {
                id: req.params.id,
                model: product.model,
                version: product.version,
                cost: product.cost
            }
            product.amount--;

            ordered_product.push(products_numb)
            res.send(products_numb);
        } else {
            return res.status(200).json(product);
        }
    })

    .delete((req, res) => {
        const product = products.find(item => item.id == req.params.id)

        if (!product) {
            res.status(404).send(`Product with id: ${req.params.id} not found`)
        }

        const indexOfProduct = products.indexOf(product);
        products.splice(indexOfProduct, 1)
        res.status(200).send(product)
    })

function show_l(product, req, res) {

    if (product) {

        return (//'id: ' + product.id //+
            " МОДЕЛЬ ТЕЛЕФОНУ " + product.model + " ВЕРСІЯ ПРОДУКТУ " + product.version);
    } else {
        res.status(404).send(`Product with id: ${req.params.id} not found`)
    }
}

function all_list_shop() {
    let string_list = "";
    for (let j = 0; j < products.length; j++) {
        string_list += products[j].id + "МОДЕЛЬ ТЕЛЕФОНУ " + products[j].model + " ВЕРСІЯ ПРОДУКТУ " + products[j].version + '<br>';
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

module.exports = Router;