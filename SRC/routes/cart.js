import { productDao, cartDao } from '../daos/index.js';
import { Router } from 'express';

const router = Router();


//ruta par generar la compra 
router.post('/cart', async (req, res) => {
    const { id } = req.body;
    const product = await productDao.getProductById(id);
    const cart = await cartDao.createCart(product);

    res.json(cart);
});


router.post('/', (req, res) => {
    const cart = {
        timestamp: Date.now(),
        products: [],
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
    idProduct = parseInt(idProduct)
    productDao.getById(idProduct)
        .then(product => {
            cartDao.getById(id)
                .then(cart => {
                    Object.values = (obj) => Object.keys(obj).map(key => obj[key]);
                    const products = Object.values(cart.products);
                    products.push(product);
                    cartDao.updateById(id, { products })
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
            const newProducts = cart.products.filter(product => product.id !== id_prod)
            const newCount = newProducts.length
            if (prevCount !== newCount) {
                cart.products = newProducts
                cartDao.updateById(id, cart)
                    .then(data => { res.json(data) })
            } else {
                res.json({ error: 'Producto no encontrado' })
            }
        })
})


export default router;