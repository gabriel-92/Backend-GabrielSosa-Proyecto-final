import express from "express";
const router = express.Router();
const { faker } = require('@faker-js/faker')


const id = Math.floor(Math.random() * 1000);
const stock = Math.floor(Math.random() * 50) * 50;
const PRODUCT_RANDOM = 5;

function crearCombinacionAlAzar(id) {
    const combination = {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(200, 200, 'image', true),
        description: faker.commerce.productDescription(),
        stock: stock,
        category: faker.commerce.department(),
    }
    return combination
}

function crearProductosAlAzar() {
    const products = [];
    for (let i = 0; i < PRODUCT_RANDOM; i++) {
        products.push(crearCombinacionAlAzar(id + i))
    }
    return products
}

router.get("/", (req, res) => {
    const products = crearProductosAlAzar();
    res.render('productTest', {
        products,
        title: "product Test"
    })
});

router.get('/detail/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        const products = crearProductosAlAzar();
        const product = products.find(product => product.id === id)
        res.render('detail', {
            product,
            title: "detail"
        })
    } else {
        res.redirect('/api/')
    }
})


export default router;


