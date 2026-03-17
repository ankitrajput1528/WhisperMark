const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname))

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/whispermark")

const Product = mongoose.model("Product",{

name:String,
price:Number,
image:String

})

app.get("/products", async(req,res)=>{

let products = await Product.find()

res.json(products)

})

app.post("/add-product", async(req,res)=>{

let p = new Product(req.body)

await p.save()

res.json({status:"added"})

})

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log("Server running on port " + PORT))
