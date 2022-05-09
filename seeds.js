const mongoose = require('mongoose');

// here is schema
const Product = require('./models/product')


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/farmStand');
    await console.log('Mongo Connection Established!!')
}

// const p = new Product({
//     name: "Ruby Grapefruit",
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then( p =>{
//     console.log(p);
// })
// .catch(e => {
//     console.log(e);
// })

const seedProduct = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Oranginc Mini Seedless Watermelon'
        , price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Goddess Melon'
        , price: 4.39,
        category: 'fruit'
    },
    {
        name: 'Oraganic Celery'
        , price: 1.50,
        category: 'vegetable'
    }, {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    }
]

Product.insertMany(seedProduct)
.then(res => {
    console.log(res);
})
.catch(err => {
    console.log(err)
})