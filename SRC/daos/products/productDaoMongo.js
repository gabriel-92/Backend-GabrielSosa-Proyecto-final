import Container from "../../controllers/containerMONGO";
import productSchema from "./schema/productSchema";

module.exports = class ProductDao extends Container {
    constructor() {
        super(productSchema, 'products');
        this.connect().catch(err => {
            throw new Error(err)
        })
    }
}