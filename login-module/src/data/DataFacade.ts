import { Collection, Db, MongoClient, MongoError } from 'mongodb'

export interface User {
    username: string,
    password: string
}

const USER_COLLECTION = "users";

const URL: string = "mongodb://localhost:3006";

const DB_NAME: string = 'login-module';

async function getCollection(collectionName: string): Promise<Collection> {
    return new Promise((resolve, reject) => {
        MongoClient.connect(URL, (error, client) => {
            let db = client.db(DB_NAME);
            let collection = db.collection(collectionName);
            resolve(collection);

        });
    })
}

export async function insertUser(user: User) {
    let collection = await getCollection(USER_COLLECTION);
    collection.insertOne(user);
}

export async function findUser(username: string): Promise<User> {
    let collection = await getCollection(USER_COLLECTION);
    let user = collection.findOne({ username });
    return user;
}