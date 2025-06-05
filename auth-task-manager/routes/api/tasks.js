const express = require('express');
const router = express.Router();
const tasksController = require('../../controllers/tasksContoller');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');

router.route('/')
    .get(tasksController.getAllTasks)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), tasksController.createNewTask)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), tasksController.updateTask)
    .delete(verifyRoles(ROLES_LIST.Admin), tasksController.deleteTask)

router.route('/:id')
    .get(tasksController.getTask)

module.exports = router;
