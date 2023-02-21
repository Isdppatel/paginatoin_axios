const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const { render } = require('ejs');
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "studentDb"
})
const PORT = 5023;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/page/:id', (req, res) => {

    var pid = req.params.id || 1;
    var limit = 10;
    var offset = (pid - 1) * limit;
     console.log(pid);
    // const searchTerm = req.query.searchTerm || '';
    // console.log(searchTerm);

    var count;
    var total_cnt;
    connection.query(` select count(st_table.student_id) as total from studentDb.st_table `, (err, results) => {
        count = results;
        total_cnt = count[0]['total'];
        console.log(`select * from st_table order by student_id LIMIT ${offset},${limit}`);
        connection.query(`select * from st_table order by student_id LIMIT ${offset},${limit}`, (err, result) => {
            var page = pid;
            var next, prev;
            if (page >= (total_cnt) / limit) {
                page = 0;
            }
            next = Number(page) + 1;
            prev = page - 1;
            if (prev == 0) {
                prev = 1;
            }


            if (err) throw err;
            
            res.render('page_idx.ejs', { data: result, prev: prev, next: next, id: pid });
            // return res.json({result});
          //  res.redirect('/page/data/:id');
        })
    })
    
    
});
app.get('/page/data/:id',(req,res)=>{
    var pid = req.params.id || 1;
    var limit = 10;
    var offset = (pid - 1) * limit;
     console.log("dssdssd");
    // const searchTerm = req.query.searchTerm || '';
    // console.log(searchTerm);

    var count;
    var total_cnt;
    connection.query(` select count(st_table.student_id) as total from studentDb.st_table `, (err, results) => {
        count = results;
        total_cnt = count[0]['total'];
        console.log(`select * from st_table order by student_id LIMIT ${offset},${limit}`);
        connection.query(`select * from st_table order by student_id LIMIT ${offset},${limit}`, (err, result) => {
            var page = pid;
            var next, prev;
            if (page >= (total_cnt) / limit) {
                page = 0;
            }
            next = Number(page) + 1;
            prev = page - 1;
            if (prev == 0) {
                prev = 1;
            }



            if (err) throw err;
            return res.json({result});
            // res.render('page_idx.ejs', { data: result, prev: prev, next: next, id: pid });
        })
    })
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/page`);
})
connection.connect();


/*

<div class="link">
    <a href="http://localhost:5023/page/<%=prev%>">Prev</a>
    <a href="http://localhost:5023/page/1">1</a>
    <a href="http://localhost:5023/page/2">2</a>
    <a href="http://localhost:5023/page/3">3</a>
    <a href="http://localhost:5023/page/4">4</a>
    <a href="http://localhost:5023/page/5">5</a>
    <a href="http://localhost:5023/page/6">6</a>
    <a href="http://localhost:5023/page/7">7</a>
    <a href="http://localhost:5023/page/<%=next%>">Next</a>
  </div>.





  <table class="table1" border="1" cellspacing="0">
    <thead>
      <tr>
        <td scope="col" width="100px">id</td>
        <td scope="col" width="100px">FirstName</td>
        <td scope="col" width="100px">LastName</td>
        <td width="200px">clgName</td>
        <td width="200px">Email</td>
        <td scope="col">city</td>
        <td scope="col">Contact</td>
      </tr>
    </thead>
    <tbody>

      <% if(data.length){ for(var i=0; i < data.length; i++) {%>
        <tr>
          <th scope="row">
            <%= data[i].student_id %>
          </th>
          <td>
            <%= data[i].student_firstName%>
          </td>
          <td>
            <%= data[i].student_LastName%>
          </td>
          <td>
            <%= data[i].student_clgName%>
          </td>
          <td>
            <%= data[i].student_emailId%>
          </td>
          <td>
            <%= data[i].student_city%>
          </td>
          </td>
          <td>
            <%= data[i].student_contact%>
          </td>
          </td>
        </tr>
        <% } }%>

    </tbody>
  </table>
*/