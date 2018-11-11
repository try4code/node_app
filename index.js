const _ = require('underscore');
const Joi = require('joi');
const express = require('express'); 
const app = express();

app.use(express.json());

var result = _.contains([1,12,4], 3);
console.log(result);

const rices = [{id:1, name: "sona"},{id:2,name:"basmathi"},{id:3,name:"brown"}];

app.get('/aoi', (req,res) => {
    res.send("Hello Siva you are improved");
});

app.get('/servers/:year', (req,res)=>{
    res.write(`${JSON.stringify(req.params)}`);
    res.write(`${JSON.stringify(req.query)}`);
    res.end();
    // res.send(req.params);
    // res.send(req.query);
})

app.get('/rices/:id',(req,res) => {
    let rice = rices.find(list => list.id === parseInt(req.params.id));
    if(!rice) res.status(404).send('Current item is not available');
    res.send(rice);
})

app.post('/rices',(req,res)=>{
    const schema = { name: Joi.string().min(3).required()};
    const result=Joi.validate(req.body, schema);
    console.log("result from Joi: ",result)
    if (result.error) { 
        res.status(400).send(result.error.details[0].message); 
        return; }
    const item = {
        id: rices.length + 1,
        name: req.body.name
    };
    rices.push(item);
    console.log(rices);
    res.status(200).send(`Suceessfully updated ${JSON.stringify(item)}`);
})


const port = process.env.PORT || 3000;  
app.listen(port, () => console.log(`Listenning on port ${port}`));
