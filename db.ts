import { MongoClient } from "https://deno.land/x/mongo@v0.29.0/mod.ts";
import { Trail } from "./interfaces/Trail.ts";

const url = 'mongodb+srv://fallstudie_test:qhyv3ArShjyCP5t6@cluster0.yxbrm.mongodb.net/Cluster0?authMechanism=SCRAM-SHA-1';

const client = new MongoClient();
try {
    await client.connect(url);
    console.log("Database successfully connected");
} catch (err) {
    console.log(err);
}

const db = client.database("raptor");
const trails = db.collection<Trail>("trails");

export default trails;