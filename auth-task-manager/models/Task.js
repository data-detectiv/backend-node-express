const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: String,
    due_date: Date,
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Task', tasksSchema);