const fs = require('fs')
const path = require('path')
import log from "../models/log";

module.exports = class ContainerFilesystem {
    constructor(filename) {
        this.filename = filename
        this.data = path.join(__dirname, '../DB/FS_JSON/', filename)
        try {
            fs.accessSync(this.data, fs.constants.F_OK)
        } catch (error) {
            fs.writeFileSync(this.data, '[]')
        }
    }
    async save(product) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const newProduct = { id: dataParse.length + 1, ...product };
            dataParse.push(newProduct);
            await fs.promises.writeFile(this.data, JSON.stringify(dataParse, null, 2));
            return newProduct;
        } catch (error) {
            log.error(error);
        }
    }
    async getAll() {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            log.error(error);
        }
    }

    async getById(id) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const product = dataParse.find(product => product.id === id);
            return product;
        } catch (error) {
            log.error(error);
        }
    }
    async deleteById(id) {
        try {
            const data = await fs.promises.readFile(this.data, 'utf-8');
            const dataParse = JSON.parse(data);
            const newData = dataParse.filter(product => product.id !== id);
            await fs.promises.writeFile(this.data, JSON.stringify(newData, null, 2));
            return newData;
        } catch (error) {
            log.error(error);
        }
    }

    async updateById(id, productUpdate) {
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
            log.error(error);
        }
    }
}
