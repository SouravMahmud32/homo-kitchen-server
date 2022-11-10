const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dhklnue.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('homoKitchen').collection('services');

        app.get('/services', async(req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query).limit(3);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.get('/allservices', async(req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        app.post("/allservices", async (req, res) => {
            try {
              const result = await Product.insertOne(req.body);
          
              if (result.insertedId) {
                res.send({
                  success: true,
                  message: `Successfully created the ${req.body.name} with id ${result.insertedId}`,
                });
              } else {
                res.send({
                  success: false,
                  error: "Couldn't create the product",
                });
              }
            } catch (error) {
              console.log(error.name.bgRed, error.message.bold);
              res.send({
                success: false,
                error: error.message,
              });
            }
          });
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await serviceCollection.findOne(query);
            res.send(services);
        });
    }
    finally{

    }
}

run().catch(console.dir);



app.get('/', (req, res) =>{
    res.send('Homo kitchen is running')
});

app.listen(port, () =>{
    console.log(`Homo kitchen server running on ${port}`);
})