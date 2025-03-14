const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Student Attendance System');
});

app.get('/api/students', async (req, res) => {
    const data = await fs.readFile('./data/students.json', 'utf8');
    const students = JSON.parse(data);
    res.json(students);
});

app.post('/api/students/:id/:name', async (req, res) => {
    const name = req.params.name;
    const id = req.params.id;
    const data = await fs.readFile('./data/students.json', 'utf8');
    const students = JSON.parse(data);
    
    students.push({ name, id });
    await fs.writeFile('./data/students.json', JSON.stringify(students, null, 2));
    res.json({ message: 'Student added successfully!' });
});

app.get('/api/students/:id', async (req, res) => {
    const data = await fs.readFile('./data/students.json', 'utf8');
    const students = JSON.parse(data);
    const student = students.find(s => s.id === req.params.id);
    res.json(student);
});

app.delete('/api/students/:id', async (req, res) => {
    const data = await fs.readFile('./data/students.json', 'utf8');
    const students = JSON.parse(data);
    const filteredStudents = students.filter(s => s.id !== req.params.id);
    await fs.writeFile('./data/students.json', JSON.stringify(filteredStudents, null, 2));
    res.json({ message: 'Student deleted successfully!' });
});

app.post('/api/attendance/:date/:studentId/:status', async (req, res) => {
    const date = req.params.date;
    const studentId = req.params.studentId;
    const status = req.params.status;
    const data = await fs.readFile('./data/attendance.json', 'utf8');
    const attendance = JSON.parse(data);
    
    attendance.push({ date, studentId, status });
    await fs.writeFile('./data/attendance.json', JSON.stringify(attendance, null, 2));
    res.json({ message: 'Attendance marked successfully!' });
});

app.get('/api/attendance/:date', async (req, res) => {
    try {
        const data = await fs.readFile('./data/attendance.json', 'utf8');
        const attendance = JSON.parse(data);
        
        const dateAttendance = attendance.find(a => a.date === req.params.date);
        
        if (dateAttendance) {
            res.json(dateAttendance);
        } else {
            res.status(404).json({ error: `No attendance found for ${req.params.date}` });
        }
    } catch {
        res.json({ records: [] });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});