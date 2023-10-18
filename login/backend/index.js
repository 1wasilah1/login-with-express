import express from 'express'
import cors from 'cors'  // agar tidak terkena CORS npm install cors di BE
import bodyParser from 'body-parser'


import datastore from './config.json' assert {type: 'json'}; //store data dari file json

const app = express(cors({
    credentials: true,
    origin : ["http://127.0.0.1:3000"] // untuk antissipasi CORS
}))
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())//untuk parsing body dari request

app.get("/", (req, res) => {
 
    res.json({ message : "hello express!" })
})

app.post("/api/login", function(req, res){
    
    let respStatus = false, respMessage = '', passMessage='',usernameMessaage=''

    const dataRequest = req.body
    
    var uName = dataRequest.username
    var pass = dataRequest.password

    var dataStoreUname = datastore.username 
    var dataStorePass = datastore.password

    respStatus = uName==dataStoreUname&&pass==dataStorePass?true:false
   
    usernameMessaage = uName!==dataStoreUname?"username salah!":""
    passMessage = pass!==dataStorePass?"password salah!":""
    
    respMessage = usernameMessaage==''&&passMessage==''?'Login Berhasil':usernameMessaage+passMessage
    const dataJson = {
        status: respStatus,
        message: respMessage
        }
    res.json({ data : dataJson})
})


app.listen(5000,"0.0.0.0", () => {
    console.log(`Example app listening on port ${5000}`)
})