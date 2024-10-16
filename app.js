// Task1: initiate app and run server at 3000
var express=require('express');
const path=require('path');
const app =express();
require('dotenv').config();
app.use(express.json());
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));


// Task2: create mongoDB connection 
const employeeModel = require('./model/employeeModel');


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
var mongoose = require('mongoose');
mongoose.connect(process.env.mongo_url)
    .then( () => {
        console.log('Database is Connected');
    })
    .catch( (err) => {
        console.log(err);
    })


//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async(req, res) => {
    try {
        res.status(200).send(await employeeModel.find());
    } catch (error) {
        res.status(404).send('Could not get data');
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async(req, res) => {
    try {
        var data = await employeeModel.findById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(404).send('Could not get data');
    }
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async(req, res) => {
    try {
        await new employeeModel(req.body).save();
        res.status(200).send("Data added");
    } catch (error) {
        res.status(404).send("Cannot send data");
    }
});


//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async(req, res) => {
    try {
        await employeeModel.findByIdAndDelete(req.params.id);
        res.status(200).send("Data Deleted");
    } catch (error) {
        res.status(404).send("Cannot delete data");
    }
});


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist/:id', async(req, res) => {
    try {
        await employeeModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send("Data Updated");
    } catch (error) {
        res.status(404).send("Cannot Update data");
    }
});


app.listen(3000, () => {
    console.log('Server is running on 3000');
})


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});