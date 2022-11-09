import express from "express";
const router = express.Router();
import { productDao } from "../daos/index.js";
import { auth } from "./users";
import log from "../models/log";



router.get("/", async (req, res, next) => {
    const products = await productDao.getAll();
    log.info(`${req.method}${req.path} user: ${req.user ? req.user.email : "guest"}`);
    res.render("index", { title: "Home", products, });
});

router.get('/addProducts', auth, async (req, res, next) => {//?authorization is needed
    log.info(`${req.method}${req.path} user: ${req.user.email}`);
    res.render('addProducts', { title: "Add Products", });
});

router.post('/addProducts', auth, (req, res) => {//?authorization is needed
    const { title, price, description, image, stock, category } = req.body
    const product = { title, price, image, description, stock, category }
    productDao.save(product)
        .then(product => {
            res.redirect('/api')
            log.info(`${req.method}${req.path} user: ${req.user.email}`)
        })
})

router.get('/update/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    productDao.getById(id)
        .then(data => {
            log.info(`${req.method}${req.path} user: ${req.user.email}`)
            res.render('update', { title: "update", product: data });
        })
})

router.put('/:id', auth, (req, res,) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    const { title, price, description, image, stock } = req.body
    const product = { title, price, image, description, stock }
    productDao.updateById(id, product)
        .then(data => {
            res.status(data, product)
            log.info(`${req.method}${req.path} user: ${req.user.email}`)
            res.redirect('/api/',)
        })
})

router.delete('/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    productDao.deleteById(id)
    log.info(`${req.method}${req.path} user: ${req.user.email}`)
        .then(data => { res.json(data) })
})

//detail renderiza el producto seleccionado en el detail
router.get('/detail/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        productDao.getById(id)
            .then(data => {
                log.info(`${req.method}${req.path} user: ${req.user.email}`)
                res.render('detail', { title: "detail", product: data, })
            })
    }
})


export default router