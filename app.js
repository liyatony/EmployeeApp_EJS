const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));

let employees = [
  { id: 1, name: 'Maria Joe', designation: 'Manager', location: 'New York', salary: 75000 },
  { id: 2, name: 'Sankeerth', designation: 'Developer', location: 'San Francisco', salary: 65000 },
  { id: 3, name: 'Nikhitha M', designation: 'Tester', location: 'Chicago', salary: 50000 },
  { id: 4, name: 'Gayathri S', designation: 'UI/UX Designer', location: 'Austin', salary: 58000 },
  { id: 5, name: 'Aravind R', designation: 'HR Executive', location: 'Los Angeles', salary: 47000 },
  { id: 6, name: 'Liya Tony', designation: 'Team Lead', location: 'Seattle', salary: 72000 },
  { id: 7, name: 'Tessa Vincent', designation: 'Business Analyst', location: 'Boston', salary: 69000 },
  { id: 8, name: 'Melbi Mathew', designation: 'Data Scientist', location: 'Denver', salary: 80000 },
  { id: 9, name: 'Ashly Maria', designation: 'DevOps Engineer', location: 'Atlanta', salary: 76000 },
  { id: 10, name: 'Nandana R', designation: 'QA Engineer', location: 'Houston', salary: 53000 }
];

app.get('/', (req, res) => {
  res.render('index', { employees, msg: req.query.msg });
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.post('/add', (req, res) => {
  const { name, designation, location, salary } = req.body;
  const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
  employees.push({ id, name, designation, location, salary: parseFloat(salary) });
  res.redirect('/?msg=added');
});

app.get('/edit/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  res.render('edit', { employee });
});

app.post('/update/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, designation, location, salary } = req.body;
  const index = employees.findIndex(emp => emp.id === id);
  if (index !== -1) {
    employees[index] = { id, name, designation, location, salary: parseFloat(salary) };
  }
  res.redirect('/?msg=updated');
});

app.get('/delete/:id', (req, res) => {
  employees = employees.filter(emp => emp.id != req.params.id);
  res.redirect('/?msg=deleted');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
