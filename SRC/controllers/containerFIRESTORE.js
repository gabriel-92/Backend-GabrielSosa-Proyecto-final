import admin from 'firebase-admin';
import { firebaseConfig } from '../configDB.js';
import log from '../models/log.js';

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
})

const db = admin.firestore();

module.exports = class Container {
    constructor(collection) {
        this.collection = db.collection(collection);
    }

    async getAll() {
        try {
            const querySnapshot = await this.collection.get();
            if (querySnapshot.empty) {
                return [];
            }
            const docs = querySnapshot.docs;
            const output = docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return output;
        } catch (error) {
            log.error(error);
        }
    }

    async getById(id) {
        try {
            const querySnapshot = await this.collection.get();
            if (querySnapshot.empty) {
                return [];
            }
            const docs = querySnapshot.docs;
            const output = docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            const item = output.filter((item) => item.id === id);
            return item[0];
        } catch (error) {
            log.error(error);
        }
    }

    async save(data) {
        try {
            const id = (await this.collection.get()).size + 1;
            data.id = id;
            await this.collection.doc(id.toString()).set(data);
            return data;
        } catch (error) {
            log.error(error);
        }
    }

    async deleteById(id) {
        try {
            await this.collection.doc(id.toString()).delete();
            return { id };
        } catch (error) {
            log.error(error);
        }
    }

    async updateById(id, item) {
        try {
            const doc = await this.collection.doc(id.toString()).get();
            if (!doc.exists) {

                log.info('No such document!');
            } else {
                for (const key in item) {
                    if (item[key] === undefined) {
                        item[key] = doc.data()[key],
                            id = doc.data().id;
                    }
                }
                item.id = id;
                await this.collection.doc(id.toString()).set(item);
                return item;
            }
        } catch (error) {
            log.error(error);
        }
    }
}