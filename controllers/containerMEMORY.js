module.exports = class ContainerMemory {
    constructor() {
        this.container = []
    }

    async save(data) {
        try {
            if (this.container.length > 0) {
                data.id = this.container.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
            } else {
                data.id = 1
            }
            this.container.push(data)
            return data.id
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            console.log(this.container)
            if (this.container) {
                return this.container
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const item = this.container.filter(obj => obj.id === id)
            if (item.length > 0) {
                return item[0]
            } else {
                return { error: 'data not found' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(id, item) {
        item.id = id
        try {
            const idx = this.container.findIndex(obj => obj.id === item.id)
            if (idx !== -1) {
                this.container[idx] = item
                return { success: 'data updated' }
            } else {
                return { error: 'data not found' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const len = this.container.length
            const flt = this.container.filter(obj => obj.id !== id)
            if (len > flt.length) {
                this.container = flt
                return { success: 'data deleted' }
            } else {
                return { error: 'data not found' }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            this.container = []
        } catch (error) {
            console.log(error)
        }
    }
}