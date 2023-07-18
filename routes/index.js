const express = require('express')
const router = express.Router();
const statsModel = require('../models/clicked.model')
const urlmodel = require('../models/url.model')

router.get('/:code' , async (req , res)=>{
    try {
        const url = await urlmodel.findOne({code : req.params.code})

        console.log(req.params)

        if(url){
            let obj = await statsModel.findOne({code : req.params.code})
            console.log(obj);
            if(!obj){
                obj = new statsModel({
                    code : url.code,
                    totalClicks : 1,
                })
                obj.save();
            }
            else{
                obj.totalClicks += 1;
                obj.save();
            } 
            res.redirect(url.longUrl);
        }
        else{
            res.status(404).json('NO url found');
            
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json('server error');
    }
})

module.exports = router;