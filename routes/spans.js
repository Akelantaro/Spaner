const express = require('express');
const router = express.Router();
const Span = require('../models/spans');

router.get('/getTrace/:traceID', (req, res)=> {
    Span.GetSpans(req.params.traceID,(err, check)=>{
        if (err) console.log(err);
        if (check){
            res.json(check);
        } 
        else res.json("не найдено");
    })
});

module.exports = router;