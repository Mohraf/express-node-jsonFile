const express = require('express');
const fs = require('fs');
// const Chart = require('chart.js/dist/Chart.min.js')

// const bodyParser = require('body-parser');1
// const multer = require('multer');

// const upload = multer();

const path = require('path');

const app = express();
// const router = express.Router();

// this line is needed to parse the request body
app.use(express.json())

// for parsing application/json
// app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(express.urlencoded({extended: true}));

//for parsing maltipart/form-data
// app.use(upload.array());
// app.use(express.static('public'));

app.post('/student/add', (req, res) => {
    //get the existing student data
    const existStudents = getStudentData()

    //get the new student data from post request
    const studentData = req.body

    //check if the studentData fields are missing
    if (studentData.name == null || studentData.number == null || studentData.score == null) {
        return res.status(401).send({error: true, msg: 'Student data missing'})
    }

    //check if the student exist already
    const findExist = existStudents.find( student => student.number === studentData.number)
    if (findExist) {
        return res.status(409).send({error: true, msg: 'student exists already'})
    }

    //append the student data
    existStudents.push(studentData)

    //save the new student data
    saveStudentData(existStudents);
    res.send({success: true, msg: 'Student data added successfully'})
})

/* Read - GET method */
app.get('/student/list', (req, res) => {
    const students = getStudentData()
    res.send(students)
})

/* Update - Patch method */
app.patch('/student/update/:number', (req, res) => {
    //get the student data from url
    const number = req.body.number

    //get the update data
    const studentData = req.body

    //get the existing student data
    const existStudents = getStudentData()

    //check if the student name exist or not
    const findExist = existStudents.find( student => student.number == number )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'Student does not exist'})
    }

    //filter the student data
    const updateStudent = existStudents.filter( student => student.number !== number )

    //push the updated data
    updateStudent.push(studentData)

    //finally save it
    saveStudentData(updateStudent)

    res.send({success: true, msg: 'Student data updated successfilly'})
})

/* Delete - Delete method */
app.delete('/student/delete/:number', (req, res) => {
    const number = req.params.number
    
    //get the existing student data
    const existStudents = getStudentData()

    //filter the student to remove them
    const filterStudent = existStudents.filter( student => student.number != number )

    if ( existStudents.length === filterStudent.length ) {
        return res.status(409).send({error: true, msg: 'Student does not exist'})
    }

    //save the filtered data
    saveStudentData(filterStudent)

    res.send({success: true, msg: 'Student removed successfuly'})

})

/* util functions */
//read the user data from json file
const saveStudentData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('results.json', stringifyData)
}
//get the user data from json file
const getStudentData = () => {
    const jsonData = fs.readFileSync('results.json')
    return JSON.parse(jsonData)
}
/* util functions ends */


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})

//configure the server port
app.listen(3000, () => {
    console.log('Server runs on port 3000')
})
