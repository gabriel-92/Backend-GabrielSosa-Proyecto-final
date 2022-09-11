const express = require('express');
const router = express.Router();
const Container = require('../container/Contenedor.js');
const data = require('../public/mockup/product.json');
const container = new Container(data);

const auth = require('../routes/login');

/* GET home page. */

router.get('/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        container.getById(id)
            .then(data => {
                res.render
                    ('detail', { title: "detail", product: data })
            })
    } else {
        container.getAll()
            .then(data => {
                res.render('index', { title: "index", products: data })
            })
    }//si los params son /addProduct, renderiza el formulario de carga de producto 
    if (req.url === '/addProducts') {//?authorization is needed
        res.render('addProducts', { title: "addProduct", products: data })
    }
})
//.post recibe los datos del formulario de carga de producto y los guarda en el archivo json
router.post('/addProducts', auth, (req, res) => {//?authorization is needed
    const { title, price, description, image, stock } = req.body
    const product = { title, price, image, description, stock }
    container.save(product)
        .then(data => {
            res.redirect('/api/' + data.id)
        })
})//.delete borra el producto del archivo json  

router.delete('/:id', auth, (req, res) => {//?authorization is needed
    //!problema con el método DELETE en el navegador, si funciona con postman
    let { id } = req.params
    id = parseInt(id)
    container.delete(id)
        .then(data => { res.json(data) })
})//.get recibe el id del producto y lo busca en el archivo json, y renderiza el form de edicion de producto
//!problema con el método PUT en el navegador, si funciona con postman
router.get('/update/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    container.getById(id)
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
    container.update(id, product)
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
        container.getById(id)
            .then(data => {
                res.render('detail', { title: "detail", product: data })
            })
    }

})


module.exports = router;