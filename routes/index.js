import express from "express";
const router = express.Router();
import { productDao } from "../daos/index.js";

import auth from "../utility/login";

router.get('/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        productDao.getById(id)
            .then(data => {
                res.render
                    ('detail', { title: "detail", product: data })
            })
    } else {
        productDao.getAll()
            .then(data => {
                res.render('index', { title: "index", products: data })
            })
    }
    //si los params son /addProduct, renderiza el formulario de carga de producto
    if (req.url === '/addProducts') {//?authorization is needed
        res.render('addProducts', { title: "add Product" })
    }
})

router.post('/addProducts', auth, (req, res) => {//?authorization is needed

    const { title, price, description, image, stock, category } = req.body
    const product = { title, price, image, description, stock, category }
    productDao.save(product)
        .then(product => {
            res.redirect('/api/')
        })
})

//.delete borra el producto por id
router.delete('/:id', auth, (req, res) => {//?authorization is needed
    //!problema en el navegador con el método DELETE , si funciona con postman
    let { id } = req.params
    id = parseInt(id)
    productDao.deleteById(id)
        .then(data => { res.json(data) })
})

//.get recibe el id del producto y lo busca en el archivo json, y renderiza el form de edicion de producto
//!problema en el navegador con el método PUT , si funciona con postman
router.get('/update/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    productDao.getById(id)
        .then(data => {
            res.render('update', { title: "update", product: data })
        })
})
//.put actualiza el producto en el archivo json
router.put('/:id', auth, (req, res,) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    const { title, price, description, image, stock } = req.body
    const product = { title, price, image, description, stock }
    productDao.updateById(id, product)
        .then(data => {
            res.status(data, product)
            res.redirect('/api/' + id)
        })
})


//detail reenderiza el producto seleccionado en el detail
router.get('/detail/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        productDao.getById(id)
            .then(data => {
                //console.log(data[0], 'data');
                res.render('detail', { title: "detail", product: data })
            })
    }

})

module.exports = router;