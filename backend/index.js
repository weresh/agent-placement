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
    password: 'gitaujustus',
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
    const { accountType , firstName, lastName, email, phone, personelid, password } = req.body;
  
    // Insert user into the database
    const query = `
      INSERT INTO users (accountType , firstName, lastName, email, phone, personelid, password  )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
   
    const values = [accountType, firstName, lastName, email, phone, personelid, password];
  
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
    // console.log(personelid, password);

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
        console.log("Invalid username or password");
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
     console.log("Login succesful");
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

// get all agents in the user table
app.get('/api/agents', (req, res) => {
    const query = 'SELECT * FROM users WHERE accountType = "Agent"';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error retrieving agents:', err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(200).json(result);
    });
   });


   // get all guardians in the user table
app.get('/api/guardians', (req, res) => {
  const query = 'SELECT * FROM guardians ';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving guardians:', err);
      res.status(500).send('Internal server error');
      return;
    }
    res.status(200).json(result);
  });
 });


  // get reports
  app.get('/api/completionreport', (req, res) => {
    const query = `
      SELECT cr.*, u.firstName, u.lastName, u.email, u.phone
      FROM completion_reports cr
      LEFT JOIN users u ON cr.caseid = u.personelid
    `;
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
    const {  email, phone, fname, lname, password } = req.body;
    console.log(email, phone, fname, lname, password, userId )
    // enda submit ile form sasa nichange any data? yeah bt weka valid coz it might work. now try again to submit the form

  
    const query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ? WHERE personelid = ?';
    const values = [fname, lname, email, phone, password, userId];
  
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




app.get('/api/agents', (req, res) => {
    const query = 'SELECT * FROM agents';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error retrieving agents:', err);
        res.status(500).send('Internal server error');
        return;
      }
      res.status(200).json(result);
    });
  });


  





  // Register a new guardian
app.post('/api/guardians/register', async (req, res) => {
  const { name, phone, email, address, password } = req.body;

  const query = 'INSERT INTO guardians (name, phone, email, address, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, phone, email, address, password], (err, result) => {
    if (err) {
      console.error('Error registering guardian:', err);
      res.status(500).send('Internal server error');
      return;
    }
    res.status(201).send('Guardian registered successfully');
  });
});

// Login a guardian
app.post('/api/guardians/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM guardians WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error retrieving guardian:', err);
      res.status(500).send('Internal server error');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid email or password');
      return;
    }

    const guardian = results[0];
    if (password !== guardian.password) {
      res.status(401).send('Invalid email or password');
      return;
    }

    res.status(200).json({ guardian });
  });
});


// Submitting a tasks by Guardia
app.post('/api/tasks', (req, res) => {
  const { title, description, submitted_by, type } = req.body;

  const query = 'INSERT INTO tasks (title, description, submitted_by, type) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, submitted_by, type], (err, results) => {
    if (err) {
      console.error('Error inserting task:', err);
      res.status(500).send('Internal server error');
      return;
    }

    res.status(201).send('Task created successfully');
  });
});

// get all tasks
app.get('/api/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      res.status(500).send('Internal server error');
      return;
    }

    res.status(200).json(results);
  });
});






// // New endpoint to update assigned agent for multiple tasks
// app.post('/api/tasks/update', (req, res) => {
//   const assignments = req.body;

//   const updatePromises = Object.entries(assignments).map(([taskId, agentId]) => {
//     return new Promise((resolve, reject) => {
//       const query = 'UPDATE tasks SET assigned_agent = ? WHERE id = ?';
//       db.query(query, [agentId || null, taskId], (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   });

//   Promise.all(updatePromises)
//     .then(() => {
//       res.status(200).json({ message: 'Tasks updated successfully' });
//     })
//     .catch((err) => {
//       console.error('Error updating tasks:', err);
//       res.status(500).json({ error: 'Internal server error' });
//     });
// });


// New endpoint to assign an agent to a task
app.post('/api/tasks/:taskId/assign', (req, res) => {
  const { taskId } = req.params;
  const { agentId } = req.body;

  const query = 'UPDATE tasks SET assigned_agent = ? WHERE id = ?';
  db.query(query, [agentId || null, taskId], async (err, result) => {
    if (err) {
      console.error('Error assigning agent:', err);
      res.status(500).json({ error: 'An error occurred while assigning the agent' });
    } else {
       // Query to retrieve the guardian's email and name who submitted the task
     const guardian = await getGuardianDetails(taskId);
     console.log(guardian);
     

      res.status(200).json({ 
        // message: 'Agent assigned successfully' 
        guardian 
      });
    }
  });
});


// Function to get guardian details by taskId
const getGuardianDetails = (taskId) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT guardians.name, guardians.email 
      FROM tasks 
      JOIN guardians ON tasks.submitted_by = guardians.id 
      WHERE tasks.id = ?
    `;

    db.query(query, [taskId], (err, rows) => {
      if (err) {
        console.log("errorr occureeend");
        
        return reject('Error retrieving guardian details:', err);
      }
      if (rows.length > 0) {
        const { name, email } = rows[0];
        resolve({ name, email });
      } else {
        reject('Guardian not found for this task');
      }
    });
  });
};




// New endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [taskId], (err, result) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task deleted successfully' });
    }
  });
});


// fetch work assigned to each agent:
app.get('/api/tasks/agent/:id', (req, res) => {
  const agentId = req.params.id;

  const query = 'SELECT * FROM tasks WHERE assigned_agent = ?';

  db.query(query, [agentId], (err, results) => {
    if (err) {
      console.error('Error retrieving tasks for agent:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'No tasks found for this agent' });
    } else {
      res.status(200).json(results);
    }
  });
});



// New endpoint to update task status
app.put('/api/tasks/:id/status', (req, res) => {
  const taskId = req.params.id;
  const { status } = req.body;

  if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const query = 'UPDATE tasks SET status = ? WHERE id = ?';
  db.query(query, [status, taskId], (err, result) => {
    if (err) {
      console.error('Error updating task status:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } 

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Task not found' });
    } else {
      res.status(200).json({ message: 'Task status updated successfully' });
    }
  });
});


// completion report
app.post('/api/completionreport/:userId', (req, res) => {
  const userId = req.params.userId;
  const { datestarted, datecompleted, category, reporttitle, summary } = req.body;
  // console.log(datestarted, datecompleted, caseid, category, reporttitle, summary);
  
  const query = 'INSERT INTO completion_reports (datestarted, datecompleted, caseid, category, reporttitle, summary) VALUES ( ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [datestarted, datecompleted, userId, category,  reporttitle, summary], (err, result) => {
    if (err) {
      console.error('Error submitting report:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Submitted successfully",result);
    res.status(200).json({ message: 'Report submitted successfully', reportId: result.insertId });
  });
});
  


app.post('/api/user/updateLocation', (req, res) => {
  const { personelid, location } = req.body;
  console.log(personelid, location);

  const query = 'UPDATE users SET location = ? WHERE personelid = ?';
  db.query(query, [location, personelid], (error, results) => {
    if (error) {
      console.error('Error updating location:', error);
      return res.status(500).send('Error updating location');
    }
    res.send('Location updated successfully');
  });
});


app.get('/api/user/location/:id', (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT location FROM users WHERE personelid = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user location:', error);
      return res.status(500).send('Error fetching user location');
    }
    res.json(results[0]);
  });
});

  




  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });