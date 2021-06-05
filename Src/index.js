const express = require('express')
const { request } = require('express')
require('./db/mongoose')


const catRouter = require('./routers/cats')
const app =express()

const port = process.env.PORT || 3000
app.use(express.json())


app.use(catRouter)



app.listen(port,()=>{
    console.log('server is stratrd on port' + port)

})