const express = require('express') //import
const app = express() //calling express
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000 //env variable is port for deployment or use default port 300

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
//
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
