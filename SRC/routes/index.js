import express from "express";
const router = express.Router();
import { productDao } from "../daos/index.js";
import { auth } from "./login.js";


router.get("/", async (req, res, next) => {
    const products = await productDao.getAll();
    res.render("index", { title: "Home", products, user: req.session.user, admin: req.session.admin });
});

router.get('/addProducts', auth, async (req, res, next) => {
    res.render('addProducts', { title: "Add Products", user: req.session.user, admin: req.session.admin });
});

router.get('/update/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    productDao.getById(id)
        .then(data => {
            res.render('update', { title: "update", product: data, user: req.session.user, admin: req.session.admin })
        })
})

router.post('/addProducts', auth, (req, res) => {//?authorization is needed
    const { title, price, description, image, stock, category } = req.body
    const product = { title, price, image, description, stock, category }
    productDao.save(product)
        .then(product => {
            res.redirect('/api/', { user: req.session.user, admin: req.session.admin })
        })
})

router.delete('/:id', auth, (req, res) => {//?authorization is needed
    let { id } = req.params
    id = parseInt(id)
    productDao.deleteById(id)
        .then(data => { res.json(data) })
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
            res.redirect('/api/', { user: req.session.user, admin: req.session.admin })
        })
})


//detail renderiza el producto seleccionado en el detail
router.get('/detail/:id?', (req, res) => {
    let { id } = req.params
    id = parseInt(id)
    if (id) {
        productDao.getById(id)
            .then(data => {
                res.render('detail', { title: "detail", product: data, user: req.session.user, admin: req.session.admin })
            })
    }

})


export default router