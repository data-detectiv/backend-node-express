const express = require('express');
const router = express.Router();
const tasksController = require('../../controller/tasksContoller');

router.route('/')
    .get(tasksController.getAllTasks)
    .post(tasksController.createNewTask)
    .put(tasksController.updateTask)
    .delete(tasksController.deleteTask)

// router.get('/:id');

module.exports = router;