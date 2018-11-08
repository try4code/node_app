const _ = require('underscore');
const express = require('express'); 
const app = express();

var result = _.contains([1,12,4], 3);
console.log(result);

const rices = [{id:1, name: "sona"},{id:2,name:"basmathi"},{id:3,name:"brown"}];

app.get('/aoi', (req,res) => {
    res.send("Hello Siva you are improved");
});

app.get('/servers/:year', (req,res)=>{
    res.send(req.params);
    // res.send(req.query);
})

app.get('/rices/:id',(req,res) => {
    let rice = rices.find(list => list.id === parseInt(req.params.id));
    if(!rice) res.status(404).send('Current item is not available');
    res.send(rice);
})

const port = process.env.PORT || 3000;  

app.listen(port, () => console.log(`Listenning on port ${port}`));
