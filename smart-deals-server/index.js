const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000


const serviceAccount = require("./smart-deals-firebase-admin-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// middleware
app.use(cors());
app.use(express.json());

// create middleware: to validate Token
const verifyFirebaseToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'unauthorized access1' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'unauthorized access2' });
    }
    
    try {
        const userInfo = await admin.auth().verifyIdToken(token);
        // console.log('after token validation', userInfo);
        next();
    } catch {
        return res.status(401).send({ message: 'unauthorized access3' });
    }
}

// GET API
app.get('/', (req, res) => {
    res.send('Hello from server');
});

// connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.edix7i0.mongodb.net/?appName=Cluster0`;



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Create DataBase
        const db = client.db('smart_db');

        // Create Collections
        const productCollection = db.collection('products');
        const bidsCollection = db.collection('bids');
        const usersCollection = db.collection('users');

        // POST API: to create user
        app.post('/users', async (req, res) => {
            const newUser = req.body;

            // if user already exist do not need to insert to db
            const email = req.body.email;
            const query = { email: email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                res.send({ message: 'user already exist. do not need to insert' })
            } else {
                const result = await usersCollection.insertOne(newUser);
                res.send(result);
            }
        })

        // GET API to get all the products data
        app.get('/products', async (req, res) => {
            // const sortWithD  escendingPrice = { price_min: -1 };
            // const sortWithAscendingPrice = { price_min: 1 };
            // const cursor = productCollection.find().sort(sortWithDescendingPrice);

            // const cursor = productCollection.find().limit(2);
            // const cursor = productCollection.find().skip(2).limit(2);
            // const cursor = productCollection.find().project({title: 1, _id: 0});//only title will shown

            // Find Data with Query Parameter
            // const email = req.query.email;
            // const query = {};
            // if (email) {
            //     query.email = email;
            // }
            // const cursor = productCollection.find(query);

            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // 
        app.get('/latest-products', async (req, res) => {
            const cursor = productCollection.find().sort({ created_at: -1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        });

        // GET API to find specific product data
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        });

        // POST API to create a product
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        // PATCH API to update a product details
        app.patch('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: {
                    name: req.body.name,
                    email: req.body.name
                    // image: req.body.image
                }
            };
            const options = {};
            const result = await productCollection.updateOne(query, update, options);
            res.send(result);
        });

        // DELETE API to delete a product
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = productCollection.deleteOne(query);
            res.send(result);
        });

        // bids related APIs
        // GET API to get the bids
        app.get('/bids', verifyFirebaseToken, async (req, res) => {
            // console.log('headers', req.headers.authorization);

            const email = req.query.email;
            const query = {};
            if (email) {
                query.buyer_email = email;
            }

            const cursor = bidsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get Bids by product id with descending bids price
        app.get('/products/bids/:productId', async (req, res) => {
            const productId = req.params.productId;
            const query = { product: productId };
            const cursor = bidsCollection.find(query).sort({ bid_price: -1 });
            const result = await cursor.toArray();
            res.send(result);
        });

        // GET API: to get my bids using buyer email address
        app.get('/bids', async (req, res) => {
            const query = {};
            if (query.email) {
                query.buyer_email = email;
            }

            const cursor = bidsCollection.find(query);
            const result = cursor.toArray();
            res.send(result);
        });

        // POST API: to post a bids
        app.post('/bids', async (req, res) => {
            const newBids = req.body;
            const result = await bidsCollection.insertOne(newBids);
            res.send(result);
        });

        // DELETE API: to remove bids
        app.delete('/bids/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bidsCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// Listen the Server
app.listen(port, (req, res) => {
    console.log(`Server is running at: http://localhost:${port}`);
});