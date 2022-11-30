import express from "express";
const router = express.Router();


const id = Math.floor(Math.random() * 1000);
const PRODUCT_RANDOM = 5;


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


