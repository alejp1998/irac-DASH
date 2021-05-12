const express = require('express')
const app = express()
const port = 6200;
const fs = require('fs');
var crypto = require("crypto");
const bodyParser = require('body-parser');
var cors = require('cors');
var CryptoJS = require("crypto-js");

app.use(cors());
app.use(express.static('/'));
app.use(express.static('public'));
let publicKey;
let privateKey;


publicKey = fs.readFileSync('rsa_2048_pub.pem', 'utf8');

privateKey = fs.readFileSync('rsa_2048_priv.pem', 'utf8');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.get('/getPublicKey', (req, res) => {
  	res.json({"key":publicKey});
})

app.get('/', (req, res) => {
	res.sendFile('index.html',{ root: __dirname });
})

app.get('/bundle.js', (req, res) => {
	res.sendFile('bundle.js',{ root: __dirname });
})



app.post('/getDRMKey', (req, res) => {
  const ddrmKey = returnKey(req.query.key);
  const ddrmKid = returnKid(req.query.key)
  const buff =  Buffer.from(req.body.encryptedValue.data);
  const shaKey = crypto.privateDecrypt(privateKey, buff);
  const shaText = shaKey.toString("utf-8");
   console.log("Decrypted buff: " + shaText);
  const encryptedKey = CryptoJS.AES.encrypt(ddrmKey,shaText).toString();
  const encryptedKid = CryptoJS.AES.encrypt(ddrmKid,shaText).toString();
  console.log("Encrypted key: ", encryptedKey);
  console.log("Encrypted kid: ", encryptedKid);
  res.json({"key":encryptedKey,"kid":encryptedKid});
})

const  returnKey = (key) =>{
    switch (key){
        case 'first':
            return "hyN9IKGfWKdAwFaE5pm0qg==";
        case 'second':
            return "ddrmKey2";
    }
}

const  returnKid = (kid) =>{
    switch (kid){
        case 'first':
            return "oW5AK5BW43HzbTSKpiu3SQ==";
        case 'second':
            return "ddrmKey2";
    }
}


