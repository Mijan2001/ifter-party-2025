import mongoose from 'mongoose';

const MONGO_URI =
    process.env.MONGO_URI ||
    'mongodb+srv://mijancse19:7G1g9smH2NUxFVVm@cluster0.6pvdf.mongodb.net/ifter-2025';

if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}

// Initialize cached to a default value if it's not available on global
let cached = global.mongoose;

if (!cached) {
    // Initialize mongoose cache if not present
    cached = global.mongoose = { conn: null, promise: null };
}

// Add a check to ensure cached is defined before accessing its properties
async function connectDB() {
    if (cached && cached.conn) {
        return cached ? cached.conn : null;
    }

    if (cached && !cached.promise) {
        const opts = {
            bufferCommands: false
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then(mongoose => {
            return mongoose;
        });
    }

    try {
        if (cached) {
            cached.conn = await cached.promise;
        }
    } catch (e) {
        if (cached) {
            cached.promise = null;
        }
        throw e;
    }

    return cached ? cached.conn : null;
}

export default connectDB;
