const express = require('express')
const router = express.Router();
const validUrl = require('valid-url')
const shortId = require('shortid')
const urlModel = require('../models/url.model');


router.post('/shorten' , async (req,res)=>{
    const {longUrl } = req.body;
    const baseURL = process.env.BASE_URL

    // console.log(longUrl)

    if(!validUrl.isUri(baseURL)){
        return res.status(401).json('Invalid BASE url')
    }

    let id = shortId.generate();


    if(validUrl.isUri(longUrl)){
        try{
            let url = await urlModel.findOne({longUrl})

            if(url){
                // console.log(url);
                res.json(url);
            }
            else{
                
                const shortURL = baseURL + id;
                url = new urlModel({
                    longUrl,
                    shortUrl : shortURL,
                    code : id,
                    date : new Date()
                })

                await url.save();
                res.json(url);
            }
        }
        catch(err){
            console.log(err.message)
            res.status(500).json('Internal SERVER error')
        }
    }
    else{
        return res.status(404).json('Invalid URL passed')
    }
})


module.exports = router;