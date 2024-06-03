const express = require('express')
var cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 6000

app.use(express.json())
app.use(cors({
  origin: '*'
 
}));

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qdiymxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    
    await client.connect();

    const BlogsCollection = client.db("Portfolio").collection("blogs");
   
    const UsersCollection = client.db("Portfolio").collection("users");

    app.get('/',async(req,res)=>{
        res.send("Hello Working perfectly")
    })
    app.get('/users', async(req, res) => {
      const cursor = UsersCollection.find();
      const result=await cursor.toArray()
      res.send(result)
      })
    app.get('/blogs', async(req, res) => {
      const cursor = BlogsCollection.find();
      const result=await cursor.toArray()
      res.send(result)
      })

      
    app.post('/blogs',async(req,res)=>{
      const bookings=req.body
      const result =await BlogsCollection.insertOne(bookings)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    
   

    
    



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})