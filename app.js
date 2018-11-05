var express = require('express');

var bodyParser = require('body-parser')

var router = require('./router.js')

var app = express();

app.engine('html', require('express-art-template'))

app.use('/node_modules/', express.static('./node_modules/'));
app.use('/public/', express.static('./public/'));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

//挂载路由
app.use(router);

app.listen(3000, function(){
	console.log('3000 listening')
})