import Container from "../../controllers/containerMONGO";
import cartSchema from "./schema/cartSchema";

module.exports = class cartDao extends Container {
    constructor() {
        super(cartSchema, 'cart');
        this.connect().catch(err => {
            throw new Error(err)
        })
    }
}