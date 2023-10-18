const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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


        const database = client.db("brandDB");
        // products Collection
        const productCollection = database.collection("products");
        // cart Collection 
        const cartCollection = database.collection("carts")

        //GET
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })
        //GET SINGLE ID/Product
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result)
        })

        //POST
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            console.log("newProduct:", newProduct);
            const result = await productCollection.insertOne(newProduct)
            res.send(result)
        })

        //UPDATE using PUT
        app.put('/details/:id', async (req, res) => {
            const id = req.params.id;
            const product = req.body;
            console.log(product);
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true };
            const updateProduct = {
                $set: {
                    brandName: product.brandName,
                    productName: product.productName,
                    type: product.type,
                    price: product.price,
                    rating: product.rating,
                    image: product.image,
                    updateProduct: product.updateProduct
                    
                }
            }
            const result = await productCollection.updateOne(filter,updateProduct,options)
            res.send(result);
        })

        // for cart operations 
        //GET
        app.get('/cart', async (req, res) => {
            const cursor = cartCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // post 
        app.post('/cart', async (req, res) => {
            const newCart = req.body;
            console.log("newCart:", newCart);
            const result = await cartCollection.insertOne(newCart)
            res.send(result)
        })

        //DELETE
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            console.log("DELETED ID: ", id);
            const result = await cartCollection.deleteOne(query);
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