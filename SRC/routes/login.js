import express from "express";
const router = express.Router();

const users = [
    {
        id: 1,
        username: "admin",
        password: "admin",
        admin: true
    },
    {
        id: 2,
        username: "user",
        password: "user",
        admin: false
    }
]

export const auth = (req, res,) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.session.user = user.username;
        req.session.admin = user.admin;
        res.redirect("/api/");
    } else {
        res.redirect("/login");
    }
}


router.post("/login", auth, (req, res) => {
    res.render("login", { title: "Login", error: "Invalid credentials", user: req.session.user, admin: req.session.admin });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Login", user: req.session.user, admin: req.session.admin });
});

export default router;
