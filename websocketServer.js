const express = require('express')
const app = express()
const expressWs = require('express-ws')
const websocket = require('./routes/websocket')

expressWs(app);

app.use(express.static('public'))
app.use('/websocket', websocket)
app.get('*', (req, res) => {
  res.send('404,文件不存在')
})
app.listen(3000, () => {
  console.log('server is listening on port 3000')
})