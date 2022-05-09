const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const Product = require('./models/product')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
    await console.log('Mongo Connection Established!!')
}

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())



app.get('/products', async ( req, res )=>{
    const products= await Product.find({})
    console.log(products);
    res.render('products/index', { products })
})

app.get('/products/new', ( req, res )=>{
    res.render('products/new')

})


app.post('/products', async (req, res)=>{
    const {name, category, price} = req.body
    console.log(name)
    const newProduct = await new Product(req.body)
    await newProduct.save()

    res.redirect('/products')
    // res.send('Inserted')
})

app.get('/products/:id/edit', async( req, res )=>{
    const { id } = req.params
    const foundId = await Product.findById(id)
    res.render('products/edit', { foundId })
})

app.get('/products/:id', async ( req, res)=>{
    const { id } = req.params
    const product = await Product.findById(id)
    console.log(product);
    res.render('products/show', { product })

})

app.put('/products/:id', async ( req, res)=>{
    const { id } = req.params
    await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true})
    console.log(req.body);
    res.redirect(`/products/${id}`)
})


app.get('/dog', ( req, res)=>{
    res.send("Woff!")
})

app.listen(3000, ()=>{
    console.log("APP IS LISTENING ON PORT 3000")
})

