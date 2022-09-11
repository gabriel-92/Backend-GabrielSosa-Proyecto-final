const fs = require('fs');
module.exports = class ContainerCart {

    constructor() {
        this.data = "./public/mockup/cart.json"
    }
    //getAll reenderiza todos los productos en el index 
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log(error);
        }
    }
    //getById reenderiza el producto seleccionado en el detail
    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const product = dataParse.find(product => product.id === id);
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    //save guarda el producto en el archivo json
    async save(product) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const newProduct = { id: dataParse.length + 1, ...product };
            dataParse.push(newProduct);
            await fs.promises.writeFile(this.data, JSON.stringify(dataParse, null, 2));
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }
    //delete borra el producto del archivo json
    async delete(id) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const newData = dataParse.filter(product => product.id !== id);
            await fs.promises.writeFile(this.data, JSON.stringify(newData, null, 2));
            return newData;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, productUpdate) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const newData = dataParse.map(product => {
                if (product.id === id) {
                    return { id, ...productUpdate }
                }
                return product
            })
            await fs.promises.writeFile(this.data, JSON.stringify(newData, null, 2));
            return newData;
        } catch (error) {
            console.log(error);
        }
    }
}