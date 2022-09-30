import { clienteSql } from '../configDB.js'


module.exports = class Container {
    constructor(table) {
        this.table = table
    }

    async getAll() {
        try {
            const allProCART = await clienteSql.from(this.table).select('*')
            const allParsed = JSON.parse(JSON.stringify(allProCART))
            return allParsed
        } catch (error) {
            console.log(error)
        }
    }
    async getById(id) {
        try {
            const byId = await clienteSql.from(this.table).where('id', id).select('*')
            const dataParsed = JSON.parse(JSON.stringify(byId))
            const byIdParsed = dataParsed[0]
            return byIdParsed
        } catch (error) {
            console.log(error)
        }
    }
    async save(product) {
        try {

            const saveProCART = await clienteSql.from(this.table).select('*')
            const saveParsed = JSON.parse(JSON.stringify(saveProCART))
            const newProCart = { id: saveParsed.length + 1, ...product }
            const save = await clienteSql.insert(newProCart).into(this.table)
            return save
        } catch (error) {
            console.log(error)
        }
    }
    async updateById(id, productUpdate) {
        try {
            const updateProCART = await clienteSql.from(this.table).where('id', id).update(productUpdate)
            return updateProCART
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(id) {
        try {
            const deleteProCART = await clienteSql.from(this.table).where('id', id).del()
            return deleteProCART
        } catch (error) {
            console.log(error)
        }
    }
}