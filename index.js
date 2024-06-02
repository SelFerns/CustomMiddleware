import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var usrIsAuthorised = false;

app.use(bodyParser.urlencoded({extended: true}));

function passCheck(req, res, next){
    const pass = req.body["password"];
    if(pass === "Test"){
        usrIsAuthorised = true;
    }
    next();
}

app.use(passCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if(usrIsAuthorised){
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, (req, res) =>{
    console.log(`Listening on port ${port}`);
});