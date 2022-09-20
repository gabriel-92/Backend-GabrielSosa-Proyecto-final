import { clienteSql } from '../DB/SQL.js'

export const getAll = async () => {
    try {
        const products = await clienteSql.from('products').select('*')
        return products
    } catch (error) {
        console.log(error)
    }
}

export const getById = async (id) => {
    try {
        const product = await clienteSql.from('products').select('*').where('id', id)
        const dataParsed = JSON.parse(JSON.stringify(product))
        const productId = dataParsed[0]
        return productId
    } catch (error) {
        console.log(error)
    }
}

export const save = async (product) => {
    try {
        const data = await clienteSql.from('products').insert(product)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const deleteById = async (id) => {
    try {
        const product = await clienteSql.from('products').where('id', id).del()
        return product
    } catch (error) {
        console.log(error)
    }
}

export const updateById = async (id,
    productUpdate) => {
    try {
        const product = await clienteSql.from('products').where('id', id).update(productUpdate)
        return product
    } catch (error) {
        console.log(error)
    }
}
