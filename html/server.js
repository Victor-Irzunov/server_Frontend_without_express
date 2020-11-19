//-----------------------------------возврат HTML файлов
const http = require('http')
const fs = require('fs')
const path = require('path')

const hello = require('./hello.json')
const bye = require('./bye.json')

http
	.createServer((req, res) => {
		if (req.url === '/hello') {
			res.setHeader('Content-Type', 'application/json')
			return res.end(JSON.stringify(hello))
		}
		else if (req.url === '/bye') {
			res.setHeader('Content-Type', 'application/json')
			return res.end(JSON.stringify(bye))
		}

		if (req.url === '/') {
			return fs.readFile(                                                 //acинхроно вычитываем файл
				path.resolve(__dirname, './index.html'),
				(err, htmlString) => {
					if (err) {
						res.setHeader('Content-Type', 'application/json')
						res.statusCode = 404
						return res.end(JSON.stringify({ error: 'Not found' }))
					}

					return res.end(htmlString)
				},
			)
		}
		res.setHeader('Content-Type', 'application/json')
		res.statusCode = 404
	}).listen(3000)