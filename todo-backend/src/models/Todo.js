import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lists: [{
    id: String,
    title: String,
    position: Number
  }],
  tasks: [{
    id: String,
    title: String,
    description: String,
    list: String,
    position: Number,
    completed: Boolean
  }],
  settings: {
    background: {
      type: { type: String },
      value: String
    }
  }
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema); 