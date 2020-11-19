// const http = require('http')
// http.createServer((req, res) => res.end('Hello')).listen(3000)



//------------------------------------------------возврат json файлов
const http = require('http')

const hello = require('./hello.json')   //require сразу парсит json файлы
const bye = require('./bye.json')

http
	.createServer((req, res) => {
		res.setHeader('Content-Type', 'application/json')     //сообщаем браузеру что возврощаем обратно JSON

		if (req.url === '/hello') {                        //смотрим на текущий url который пришел
			return res.end(JSON.stringify(hello))
		}
		else if (req.url === '/bye') {
			return res.end(JSON.stringify(bye))
		}

		res.statusCode = 404                                  //если нето и не то
		return res.end(JSON.stringify({ error: 'Not found' }))
	})
	.listen(3000)


