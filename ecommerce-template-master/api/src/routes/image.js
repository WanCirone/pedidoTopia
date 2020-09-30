const server = require('express').Router();
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

server.post('/', async (req, res) => {
    try{ 
        const result = await req.body.map(image => cloudinary.v2.uploader.upload(image))
        Promise.all(result)
        .then( images => res.send(images))
        
    } catch(err){
        res.status(500).send({
            "error": err
        })
    }
})

module.exports = server;