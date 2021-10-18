const express = require('express')
const app = express()
const http = require('http').createServer(app)/*jis se bhi hum ne const app = express()
variable usi ka add hoga yaha ServerResponce()me*/

const PORT = process.env.PORT || 3001
// const PORT = 3000 || process.env.ServerResponse ...same ||
//server create kiya humne


http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
//app.use express.static ye ek middleware hai, so publicaly access by url 
//so that can access file from folder via http

//rout 
//agar ye url koi req karta hai usko responce ye ayega
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // res.sendFile(__filename + '/index.html')
    // res.sendFile('public/index.html' , { root : __dirname});
})
// res.sendFile(__filename + '/index.html') <!---this loc will give you error typeerror:pathis not definr or kabhi nahi bhi ayega --->
    // res.sendFile(path.join(__dirname, '../public', 'index.js'));
    // res.sendFile(__filename + '/index.html')
    // res.sendFile('public/index.html' , { root : __dirname});
    /* ye upar ke line me se koi ek try bhi kar sakty */

// Socket 
const io = require('socket.io')(http)
//yaha pe humne io ko require kiye aur call karke usme server jo hai apna usko define kiye (http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})


/* // 2nd simple way to create server
const express = require('express')
const app = express()
const port = 3000
  //ye app.get route hai koi req kiya to kuch response ayega
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) */