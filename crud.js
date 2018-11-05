//对数据库db.json实现增删改查的方法封装

var fs = require('fs');
var dbPath = './db.json';
var utf = 'utf8';

//查
exports.find = function(callback){
	fs.readFile(dbPath, utf, function(err, data){
		if(err){
			return callback(err);
		}else{
			callback(null, JSON.parse(data).students);
		}
	})
}

exports.findById = function(id, callback){
	fs.readFile(dbPath, utf, function(err, data){
		if(err){
			return callback(err);
		}else{
			var students = JSON.parse(data).students;
			var stu = students.find((item) => item.id == id);
			callback(null, stu);
		}
	})
}

//增
exports.save = function(student, callback){
	fs.readFile(dbPath, utf, function(err, data){
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;
		student.id = students[students.length-1].id + 1;
		students.push(student);
		var ret = JSON.stringify({
			students: students
		});

		fs.writeFile(dbPath, ret, function(err){
			if(err){
				return callback(err);
			}
			callback(null)
		});
	})
}

//改
exports.update = function(student, callback){
	fs.readFile(dbPath, utf, function(err, data){
		if(err){
			return callback(err);
		}
		var students = JSON.parse(data).students;

		var stu = students.find(function(item){
			return item.id == student.id;
		});
		Object.keys(student).forEach((item) => stu[item] = student[item]);

		var fileData = JSON.stringify({
			students: students
		});
		fs.writeFile(dbPath, fileData, function(err){
			if(err){
				return callback(err);
			}
			callback(null);
		})
	})
}  


//删
exports.delete = function(id, callback){
	fs.readFile(dbPath, utf, function(err, data){
		if(err){
			return callback(err);
		};
		var students = JSON.parse(data).students;
		var index = students.findIndex((item) => item.id == id);
		students.splice(index, 1);
		var fileData = {
			students: students
		};
		fs.writeFile(dbPath, JSON.stringify(fileData), function(err){
			if(err){
				return callback(err);
			}
			callback(null);
		})
	})
}