const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'], 
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        isCompleted: {
            type: Boolean,
            default: false, 
        },
    },
    {
        timestamps: true, 
    }
);

module.exports = mongoose.model('Todo', todoSchema);