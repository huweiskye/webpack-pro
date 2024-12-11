const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const mysql = require('mysql2');

const PORT = 3333;

app.use(express.json());

//const connection = require('./db'); 

// app.use(cors({
//     origin: 'http://localhost:8888' // 限定允许来自这个域的请求
// }));

app.use(cors())

// 创建 MySQL 连接
const connection = mysql.createConnection({
  host: 'localhost',       // 数据库主机
  user: 'root',            // 输入你的用户名
  password: '$$hello2025SF', // 输入你在安装过程中设置的密码
  database: 'database11'   // 输入你创建的数据库名
});

// 连接到数据库
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL database1111111.');
});

// 示例路由，获取用户数据SELECT * FROM database11.users;
app.get('/api/users', (req, res) => {
  connection.query('SELECT * FROM database11.users;', (error, results) => {
      if (error) return res.status(500).json({ error });
      res.json(results);
  });
});

app.post('/api/updateUsers', (req, res) => {
  const { username, password, status } = req.body

  console.log('=======req.body=======9999999999999999999999999==========', req.body)

  const sql = 'INSERT INTO users (username, password, status) VALUES (?, ?, ?)'

  connection.query(sql, [username, password, status], (error, results) => {
    if(error) {
      console.error('Error inserting data', error)
      return res.status(500).json({ error})
    }
    res.status(200).json({
      message: 'User added successfully',
      id: results
    })
  })
});



//app.use(express.json())

app.get('/api/todo', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
        res.json(response.data); // 返回获取到的数据
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }
});

app.get('/api', (req, res) => {
    res.json({message: 'Hello from server !'})
})

app.get('/api/books', (req, res) => {
    const sql = 'SELECT * FROM books'; // SQL 查询书籍表数据
  
    connection.query(sql, (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(results); // 返回查询结果
    });
});

app.get('/api/getData', async(req, res) => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    try {
        const response = await axios.get(url)
        console.log(response.data)
        console.log("=====response==========5555555555555555555555555==============", response)
        res.json(response)
    }catch (error) {
        console.log("=====error==========9999999999999999999999999==============", error)
    }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${PORT}`);
});

