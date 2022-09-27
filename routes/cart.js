const express = require('express');
const router = express.Router();
const { productDao, cartDao } = require('../daos/index.js');



router.post('/', (req, res) => {
    const { id_product } = req.body;
    const cart = {
        timestamp: Date.now(),
        id_product: [id_product],
    }
    cartDao.save(cart)
        .then(data => { res.json(data) })
})

router.delete('/:id', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    cartDao.deleteById(id)
        .then(data => { res.json(data) })
})

router.get('/:id/productos', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    productDao.getById(id)

    cartDao.getById(id)
        .then(data => { res.json(data) })
})

router.post('/:id/productos', (req, res) => {
    let { id } = req.params
    let idProduct = req.body.idProduct
    productDao.getById(idProduct)
        .then(product => {
            cartDao.getById(id)
                .then(cart => {
                    cart.id_product.push(idProduct)
                    cart.timestamp = Date.now()
                    cartDao.updateById(id, cart)
                        .then(data => { res.json(data) })
                })
        })
})
router.delete('/:id/productos/:id_prod', (req, res) => {
    let { id, id_prod } = req.params
    id = parseInt(id)
    id_prod = parseInt(id_prod)
    cartDao.getById(id)
        .then(cart => {
            const prevCount = cart.products.length
            cart.products = cart.products.filter(product => product.id !== id_prod)
            const newCount = cart.products.length
            cart.timestamp = Date.now()
            cartDao.update(id, cart)
                .then(data => {
                    if (prevCount > newCount) {
                        res.json(data)
                    } else {
                        res.json({ error: 'product not found' })
                    }
                })
                .catch(err => { res.json({ error: err }) })
        })
        .catch(err => { res.json({ error: err }) })
})



module.exports = router;