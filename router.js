// module.exports = function(app){

	// var fs = require('fs');

	// app.get('/', function(req, res){
	// 	fs.readFile('./db.json', 'utf8', function(err, data){
	// 		if(err){
	// 			return res.status(500).send('Server Error');
	// 		}
	// 		var students = JSON.parse(data).students;
	// 		res.render('index.html', {
	// 			fruits: ['苹果', '香蕉', '橘子'],
	// 			students: students
	// 		})
	// 	});
	// });

// }

var express = require('express');
var fs = require('fs');
var crud = require('./crud.js');
var router = express.Router();

router.get('/students', function(req, res){
	crud.find(function(err, data){
		if(err){
			return res.status(500).send("Server Error");
		}
		res.render('index.html', {
			students: data
		});
	})
});

router.get('/students/new', function(req, res){
	res.render('new.html')
});

router.post('/students/new', function(req, res){
	crud.save(req.body, function(err){
		if(err){
			return res.status(500).send('Server Error');
		}else{
			console.log('保存成功')
		}
	});
	res.redirect('/students');
});

router.get('/students/edit', function(req, res){
	crud.findById(req.query.id, function(err, data){
		if(err){
			return res.status(500).send('Server Error');
		}else{
			// console.log(data);
			res.render('edit.html', data)
		}
	})
});

router.post('/students/edit', function(req, res){
	console.log(req.body);
	crud.update(req.body, function(err){
		if(err){
			return res.status(500).send('Server Error');
		}
	});
	res.redirect('/students');
});

router.get('/students/delete', function(req, res){
	// console.log(req.query.id)
	crud.delete(req.query.id, function(err){
		if(err){
			return res.status(500).send('Server Error');
		}else{
			console.log("删除成功");
			res.redirect

			('/students');
		}
	})	
})

module.exports = router;