const Tasks = require('../models/Task');


const getAllTasks = async (req, res) => {
    const tasks = await Tasks.find();
    if (!tasks) return res.status(404).json({ 'message': 'No tasks found'});
    res.json(tasks);
};

const getTask = async (req, res) => {
    const task = await Tasks.findOne({ _id: req.params.id }).exec();
    if (!task) return res.status(404).json({ 'message': 'No task found.'});
    res.json(task);
};

const createNewTask = async (req, res) => {
    if (!req?.body?.title) return res.status(400).json({ 'message': 'A title is required'});

    const newTasks = await Tasks.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        due_date: req.body.due_date,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    });

    res.status(201).json(newTasks);
};

const updateTask = async (req, res) => {
    const task = await Tasks.findOne({ _id: req.body.id}).exec();
    if (!task) {
        return res.status(400).json({ 'message': `Task ID ${req.body.id} not found.`});
    }
    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;
    if (req.body.status) task.status = req.body.status;
    if (req.body.due_date) task.due_date = req.body.due_date;
    if (req.body.created_at) task.created_at = req.body.created_at;
    if (req.body.updated_at) task.user_id = req.body.updated_at;

    const result = await task.save();

    res.json(result);
};

const deleteTask = async (req, res) => {
    const task = await Tasks.findOne({ _id: req.body.id});
    if (!task) {
        return res.status(400).json({ 'message': `Task with ID ${req.body.id} not found`});
    }
    
    const result = await Tasks.deleteOne(task)

    res.json(result);
}


module.exports = {
    getAllTasks,
    getTask,
    createNewTask,
    updateTask,
    deleteTask
};