const express = require('express')
var cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 6310

app.use(express.json())
app.use(cors({
  origin: 'https://helpful-malabi-15e80a.netlify.app',
  credentials:true
 
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
    const SkillsCollection = client.db("Portfolio").collection("skills");
    const testimonialCollection = client.db("Portfolio").collection("testimonial");
    const workCollection = client.db("Portfolio").collection("work");
    const mailCollection = client.db("Portfolio").collection("mail");

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
    app.get('/skills', async(req, res) => {
      const cursor = SkillsCollection.find().sort({"_id":-1});
      const result= await cursor.toArray()

      res.send(result)
      })
    app.get('/mail', async(req, res) => {
      const cursor = mailCollection.find().sort({"_id":-1});
      const result= await cursor.toArray()
      res.send(result)
      })
    app.get('/testimonial', async(req, res) => {
      const cursor = testimonialCollection.find()
      const result= await cursor.toArray()

      res.send(result)
      })
    app.get('/addwork', async(req, res) => {
      const cursor = workCollection.find().sort({"_id":-1})
      const result= await cursor.toArray()

      res.send(result)
      })
   
      app.get('/blogs/:id', async(req, res) => {
        const id=req.params.id 
        console.log(id)
        const query={_id:new ObjectId(id)}
      
        const result=await BlogsCollection.findOne(query)
        res.send(result)
        })

      
    app.post('/blogs',async(req,res)=>{
      const blogs=req.body
      console.log(req.body)
      const result =await BlogsCollection.insertOne(blogs)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    app.post('/users',async(req,res)=>{
      const users=req.body
      
      const result =await UsersCollection.insertOne(users)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })

    app.post('/skills',async(req,res)=>{
      const skills=req.body
      console.log(skills)
      const result =await SkillsCollection.insertOne(skills)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    app.post('/testimonial',async(req,res)=>{
      const testimonial=req.body
      console.log(testimonial)
      const result =await testimonialCollection.insertOne(testimonial)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    app.post('/addwork',async(req,res)=>{
      const work=req.body
      console.log(work)
      const result =await workCollection.insertOne(work)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    app.post('/mail',async(req,res)=>{
      const mails=req.body
      console.log(mails)
      const result =await mailCollection.insertOne(mails)
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.send(result)
    })
    
   

  
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
   
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})