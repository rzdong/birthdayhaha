var express = require('express');
var path = require('path');
var app = express();
var HomeRouter = require('./routes/home');
//模板引擎
app.set('view engine', 'ejs');
//
app.set('views', path.join(__dirname, 'views'));
//
app.use(express.static(__dirname + '/public'));


//设置跨域请求头
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use('/', HomeRouter)

app.get('/node', (req, res) => {
    res.json({
        "nihao": "hello"
    })
})



app.listen(5050, function (err) {
    console.log("服务器已经启动，监听" + 5050 + "端口")
    if (err) console.log('5050端口被占用');
})