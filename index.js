const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

// brandMaster
// qElrVn5dmTvX2VnU



const uri = "mongodb+srv://brandMaster:qElrVn5dmTvX2VnU@cluster0.jxzfy8n.mongodb.net/?retryWrites=true&w=majority";

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

        const database = client.db("brandDB");
        const productCollection = database.collection("products");
        //GET
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })



        //POST
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            console.log("newProduct:", newProduct);
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







// testing server is running or not 
app.get('/', (req, res) => {
    res.send("actived")
})

app.listen(port, () => {
    console.log("I'm actived on port :", port);
})