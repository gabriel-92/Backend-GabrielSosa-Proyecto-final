// import mongoose from "mongoose";
const mongoose = require("mongoose");
import { mongoConfig } from "../configDB";

module.exports = class Container {
    constructor(schema, collection) {
        this.schema = schema
        if (this.schema) {
            this.collection = mongoose.model(collection, this.schema);
        }
    }
    async connect() {
        try {
            await mongoose.connect(mongoConfig.url)
            console.log('Conectado a Mongo')
        } catch (error) {
            console.log(error)
        }
    }
    async getAll() {
        try {
            return await this.collection.find()
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            const byId = await this.collection.findOne({ id: id })
            return byId
        } catch (error) {
            console.log(error)
        }
    }
    async save(product) {
        try {
            const count = await this.collection.countDocuments()
            product.id = count + 1
            const newProduct = new this.collection(product)
            await newProduct.save()
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, productUpdate) {
        try {
            const update = await this.collection.findOneAndUpdate({ id: id }, productUpdate)
            return update
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            const deleteProCART = await this.collection.findOneAndDelete({ id: id })
            return deleteProCART
        } catch (error) {
            console.log(error)
        }
    }
}