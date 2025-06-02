const tasksDB = {
    tasks: require('../model/tasks.json'),
    setTasks: function (data) {this.tasks = data}
};

const fsPromises = require('fs').promises;
const path = require('path');

const getAllTasks = (req, res) => {
    res.json(tasksDB.tasks);
};

const getTask = (req, res) => {
    const task = tasksDB.tasks.find(task => task.id === req.params.id);
    if (!task) return res.status(400).json({ 'message': 'No task found.'});
    res.json(task);
};

const createNewTask = async (req, res) => {
    const newTask = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        created_at: req.body.created_at,
        user_id: req.body.user_id
    };

    if (!newTask.title || !newTask.id) {
        return res.status(400).json({ 'message': 'An ID and task title are required'});
    }
    const otherTasks = tasksDB.tasks.filter(task => task.id !== req.body.id)
    tasksDB.setTasks([...otherTasks, newTask])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'tasks.json'),
        JSON.stringify(tasksDB.tasks)
    );
    res.status(201).json(tasksDB.tasks);
};

const updateTask = async (req, res) => {
    const task = tasksDB.tasks.find(task => task.id === req.body.id);
    if (!task) {
        return res.status(400).json({ 'message': `Task ID ${req.body.id} not found.`});
    }
    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.due_date) task.due_date = req.body.due_date;
    if (req.body.created_at) task.created_at = req.body.created_at;
    if (req.body.user_id) task.user_id = req.body.user_id;

    const filteredArray = tasksDB.tasks.filter(task => task.id !== req.body.id);
    const newArray = [...filteredArray, task];
    tasksDB.setTasks(newArray)
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'tasks.json'),
        JSON.stringify(tasksDB.tasks)
    );

    res.json(tasksDB.tasks);
};

const deleteTask = (req, res) => {
    const task = tasksDB.tasks.find(task => task.id === req.body.id);
    if (!task) {
        return res.status(400).json({ 'message': `Task with ID ${req.body.id} not found`});
    }
    const filteredArray = tasksDB.tasks.filter(task => task.id !== req.body.id);
    tasksDB.setTasks([...filteredArray]);
    res.json(tasksDB.tasks);
}


module.exports = {
    getAllTasks,
    getTask,
    createNewTask,
    updateTask,
    deleteTask
};