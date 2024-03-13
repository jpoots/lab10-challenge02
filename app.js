const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require("axios");
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> { 

    let ep = `http://localhost:4000/burgers/`;

    axios.get(ep).then((response)=>{
       let bdata = response.data;
       res.render('home', {titletext : 'burgers', bdata});  
    });

});

app.get('/buy', (req, res)=> { 

    let item_id = req.query.item;
    let endp = `http://localhost:4000/burgers/${item_id}`;
    
    axios.get(endp).then((response)=>{
        res.render('burger', {titletext: "item", burger: response.data.data[0]})
    });

});

app.get('/add', (req, res)=> { 
    res.render('create');
});

app.post('/add', (req, res)=> { 

    let burgertitle = req.body.titlef;
    let burgerprice = req.body.pricef;
    let burgertype = req.body.typef;

    const insertData = { 
        burgerField: burgertitle,
        priceField: burgerprice,
        typeField: burgertype,
    };

    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': '554400',

        }
    }

    let endpoint="http://localhost:4000/burgers/add";

    axios.post(endpoint, insertData, config).then((response) => {
        let insertedid = response.data.respObj.id;
        let resmessage = response.data.respObj.message;
        console.log(response.data.respObj);
        res.send(`${resmessage}. INSERTED DB id ${insertedid}`);
      }).catch((err)=>{
        console.log(err.message);
     
 });

});


const server = app.listen(PORT, () => {
    console.log(`API started on port ${server.address().port}`);
});
