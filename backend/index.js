const express = require('express');
const app = express();
const port = 5000;
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// connect to mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'agentcare'
})
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MySQL database');
    }
})


// routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Register route
app.post('/api/register', async (req, res) => {
  console.log("Executed", req.body);
    const { accountType , firstName, lastName, email, phone, personelid, password ,confirmpassword  } = req.body;
  
    // Insert user into the database
    const query = `
      INSERT INTO users (accountType , firstName, lastName, email, phone, personelid, password ,confirmpassword )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
   
    const values = [accountType, firstName, lastName, email, phone, personelid, password ,confirmpassword];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(200).send('User registered successfully');
    });
  });

  //   Login Route
app.post('/api/user/login', async (req, res) => {
    const { personelid, password } = req.body;
    console.log(personelid, password);

    // Check if the user exists in the database
    const query = `
      SELECT * FROM users
      WHERE personelid = ? AND password = ?
    `;

    const values = [personelid, password];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error querying user:', err);
        res.status(500).send('Internal server error');
        return;
      }

      if (result.length === 0) {
        res.status(401).send('Invalid username or password');
        return;
      }
     // Login successful
     const user = result[0];
     const userData={
       accountType:user.accountType,
       firstName:user.firstName,
       lastName:user.lastName,
       email:user.email,
       phone:user.phone,
       personelid:user.personelid,
       
     }
     res.status(200).json(userData);
   });
 });

//   get all users
app.get('/api/users', (req, res) => {
 const query = 'SELECT * FROM users';
 db.query(query, (err, result) => {
   if (err) {
     console.error('Error retrieving users:', err);
     res.status(500).send('Internal server error');
     return;
   }
   res.status(200).json(result);
 });
});

// Location route
app.post('/api/user/agentlocation', async (req, res) => {
    const { from, destination } = req.body;
  
    // Insert location into the database
    const query = `
      INSERT INTO agentlocation (from, destination)
      VALUES (?, ?)
    `;
  
    const values = [from, destination];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(200).send('Location sent successfully');
    });
  });



// completionreport
app.post('/api/completionreport', (req, res) => {
    const { datestarted, datecompleted, caseid, category, route, reporttitle, summary } = req.body;
    
  
    // SQL query to insert the review
    const query = `
      INSERT INTO reports (datestarted, datecompleted, caseid, category, route, reporttitle, summary)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [datestarted, datecompleted, caseid, category, route, reporttitle, summary];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting review:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      // Completion report successfully inserted
      res.status(200).json({
        message: 'Report submitted successfully',
        reviewId: result.insertId
      });
    });
  });
  
  // get all reports
  app.get('/api/completionreport', (req, res) => {
    const query = 'SELECT * FROM reports';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error retrieving reports:', err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(200).json(result);
    });
  });


// Update user data
app.put('/api/user/accountsettings/:id', (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, email, phone, password } = req.body;
  
    const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE id = ?';
    const values = [firstName, lastName, email, phone, password, userId];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Internal server error');
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).send('User not found');
        return;
      }
  
      res.status(200).send('User updated successfully');
    });
  });

  //get updated user data
  




  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });