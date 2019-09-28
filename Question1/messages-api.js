const express = require('express');
const bodyParser = require('body-parser');

const bodyParserMiddleware = bodyParser.json()
const app = express();
const port= 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParserMiddleware);

let counter=0;

app.post('/messages', (req,res) => {
    const count = 0;
    console.log("The Text property of the body",req.body.text);
    if(!req.body.text) {
        res.status(400).end(); return;
    }
    if(counter >= 5) {
        res.status(429).end(); return;
    }
    res.send({
            "message":"Message recieved loud and clear"
    });
    counter += 1;
    
})


app.listen(port,() => console.log(`Listening for requests on port ${port}`));

