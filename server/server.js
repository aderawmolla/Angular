const express = require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors)

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/enroll',(req,res)=>{
    console.log(req.body)
    res.status(200).send({message:"data received"})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})