import express from "express";
import cors from "cors";
import pg from "pg";

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'admin',
  port: 5432,
});

db.connect((err) => { // Establish database connection
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to database");
  }
});
const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date();
  return days[today.getDay()];
};
app.get("/admin", async (req,res)=>{
    try {
        const allAdmins = await db.query("select * from administration");
        res.json(allAdmins.rows);
      } catch (err) {
        console.error(err.message);
      }
});
app.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  const query = {
    text: `SELECT password, admin_name FROM administration WHERE username = $1`,
    values: [username],
  };
  try {
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const storedPassword = result.rows[0].password;
     // Extract admin_name here
    if (password === storedPassword) {
      res.json({ success: true });
      
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/clerk-login", async(req,res)=>{
    try {
        const allClerks = await db.query("select * from clerk");
        res.json(allClerks.rows);
      } catch (err) {
        console.error(err.message);
      }
});
app.post('/clerk-login', async (req, res) => {
  const { username, password } = req.body;
  const query = {
    text: `SELECT password FROM clerk WHERE username = $1`,
    values: [username],
  };
  try {
    const result = await db.query(query);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const storedPassword = result.rows[0].password;
    if (password === storedPassword) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/lectures", async (req, res) => {
  try {
    const currentDay = getCurrentDay();
    const query = "SELECT * FROM teaches WHERE day_of_week = $1";
    const values = [currentDay];
    const allLects = await db.query(query, values);

    if (allLects.rows.length === 0) {
      res.json({ message: 'No lectures scheduled' });
    } else {
      res.json(allLects.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get("/schedule", async (req, res) => {
  try {
    const query = `
      SELECT * FROM teaches 
      ORDER BY 
        CASE 
          WHEN day_of_week = 'Monday' THEN 1
          WHEN day_of_week = 'Tuesday' THEN 2
          WHEN day_of_week = 'Wednesday' THEN 3
          WHEN day_of_week = 'Thursday' THEN 4
          WHEN day_of_week = 'Friday' THEN 5
          WHEN day_of_week = 'Saturday' THEN 6
          WHEN day_of_week = 'Sunday' THEN 7
        END
    `;
    const allLects = await db.query(query);
    if (allLects.rows.length === 0) {
      res.json({ message: 'No lectures scheduled' });
    } else {
      res.json(allLects.rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.delete("/schedule/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM teaches WHERE id_no = $1 RETURNING *";
    const values = [id];
    const deletedLecture = await db.query(query, values);

    if (deletedLecture.rows.length === 0) {
      res.status(404).json({ message: 'Lecture not found' });
    } else {
      res.json({ message: 'Lecture deleted successfully' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/schedule', async (req, res) => {
  try {
    const { id_no, class_aloted, subject, start_time, end_time, day_of_week } = req.body;

    // SQL Query to insert a new row into the 'teaches' table
    const newLecture = await db.query(
      `INSERT INTO teaches (id_no, class_alloted, subject, start_time, end_time, day_of_week) 
       VALUES ($1, $2, $3, $4, $5, $6);`,
      [id_no, class_aloted, subject, start_time, end_time, day_of_week]
    );

    // Send back the newly added lecture data
    res.json(newLecture.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
app.get("/student", async (req, res) => {
  try {
    const allStudents = await db.query("select * from student");
    res.json(allStudents.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/teacher", async (req, res) => {
  try {
    const allTeachers = await db.query("select * from teacher");
    res.json(allTeachers.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/accounts", async (req, res) => {
  try {
    const allAccounts = await db.query("select * from accounts");
    res.json(allAccounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
app.get("/clerk", async (req,res)=>{
  try {
    const allAccounts = await db.query("select * from accounts");
    res.json(allAccounts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
