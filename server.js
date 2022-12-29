// ALTER TABLE users AUTO_INCREMENT = 2

var express = require('express');
//Post方式请求参数放在请求体里面，需引用body-parser解析body
var bodyParser = require('body-parser');
// var multer = require('multer'); //用于接收文件
// var upload = multer({dest: 'uploads/'});

var app = express();
// 引用
app.use(bodyParser.urlencoded({extended: false}));
//设置跨域访问
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

//json数据

const mysqlInfo = {
  host: '124.222.251.11',
  port: '26761',
  username: 'wmzspace',
  password: 'Wmzspace123', //empty for window
  database: 'yechat',
};

var mysql = require('mysql');
const connection = mysql.createConnection({
  host: mysqlInfo.host,
  port: mysqlInfo.port,
  user: mysqlInfo.username,
  password: mysqlInfo.password,
  database: mysqlInfo.database,
});

connection.connect(err => {
  if (err) throw err;
  console.log(
    'Connected successfully:\nHost:' +
      mysqlInfo.host +
      '\ndatabase:' +
      mysqlInfo.database,
  );
});

// const userInfo = {
//   username: 'test1',
//   password: 'test1',
//   gender: 'female',
//   age: null,
//   address: null,
// };

//增

// connection.query(addSql, addSqlParams, function (err, result) {
//   if (err) {
//     console.log('[INSERT ERROR] - ', err.message);
//     return;
//   }

//   console.log('--------------------------INSERT----------------------------');
//   console.log('INSERT ID:', result);
//   console.log(
//     '-----------------------------------------------------------------\n\n',
//   );
// });

// connection.end();

var data = {name: 'Test', age: '19'};

app.get('/', function (req, res) {
  console.log('get..........');
  console.log(req.query);
  if (req.query && req.query.callback) {
    var str = req.query.callback + '(' + JSON.stringify(data) + ')'; //jsonp
    console.log('jsonp: ' + str);
    res.end(str);
  } else {
    console.log('json: ' + JSON.stringify(data));
    res.end(JSON.stringify(data));
  }
});

app.post('/signup', function (req, res) {
  console.log('posting............');
  console.log(JSON.stringify(req.body));
  console.log(req.body);

  var sql = 'SELECT * FROM users';

  //查
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    console.log('--------------------------SELECT----------------------------');
    console.log(result, result.constructor.name);
    console.log('------------------------------------------------------------');

    for (let user of result) {
      // console.log("Test:", _user.username);
      // console.log(user.username)
      if (user.username == req.body.username) {
        console.log('重复!');
        res.end('该用户名已被注册！');
        // res.status(404).send('404')
        return;
      }
    }

    const addSql = `INSERT INTO users(id,username,password,gender,age,address,join_time,last_login_time) VALUES(?,?,?,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`;
    const addSqlParams = [
      0,
      req.body.username,
      req.body.password,
      req.body.gender,
      req.body.age,
      req.body.address,
    ];

    connection.query(addSql, addSqlParams, function (err, result) {
      if (err) {
        console.log('[INSERT ERROR] - ', err.message);
        return;
      }

      console.log(
        '--------------------------INSERT----------------------------',
      );
      console.log('INSERT ID:', result);
      console.log(
        '-----------------------------------------------------------------\n\n',
      );
    });
    res.end("注册成功!\n"+JSON.stringify(req.body));
  });

});

app.post('/login', function (req, res) {

  var sql = 'SELECT * FROM users';

  //查
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }

    // console.log('--------------------------SELECT----------------------------');
    // console.log(result, result.constructor.name);
    // console.log('------------------------------------------------------------');

    for (let _user of result) {
      // console.log("Test:", _user.username);
      // console.log(req.body.username, req.body.password)
      if (_user.username == req.body.username) {
        if (_user.password == req.body.password) {
          console.log('登录成功!',_user.username);
          res.end('1');
        } else {
          res.end('0');
        }
        // res.status(404).send('404')
        return;
      }

    }
    res.end('-1')
    return;
  })
});

app.listen(8085, function () {
  console.log("应用实例，访问地址为 http://43.143.213.226:8085");
  // console.log('应用实例，访问地址为 http://192.168.3.23:8085');
});
