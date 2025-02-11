import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI in env file");
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose ={conn:null,promise:null};
}

export default async function connectToDataBase(){
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {           
            bufferCommands: true,
            maxPoolSize: 10,
           
        };
        cached.promise = mongoose
        .connect(MONGODB_URI, opts)
        .then(() => {
            return mongoose.connection;
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw new Error("Error connecting to database");
    }
    console.log(cached.conn);
    return cached.conn;
}