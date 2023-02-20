import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export async function connect() {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    // consy
}

export async function closeDb() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if (mongod)
        await mongod.stop();
}