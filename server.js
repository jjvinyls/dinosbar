// [REQUIRE] //
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const http = require('http')
const path = require('path')


// [REQUIRE] Personal // Other // API // Pages //
const config = require('./s-config')


// [EXPRESS] //
const app = express()
const server = http.createServer(app)


// [USE] // Default Stuff // Set static Folder // Rate-Limiter //
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())


// [HEROKU] Set Static Folder for Heroku //
if (process.env.NODE_ENV == 'production') {
	app.use(express.static('client/dist'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
	})
}


// [PORT + LISTEN] //
const port = config.PORT
server.listen(port, () => { console.log(`Server Running on Port: ${port}`) })