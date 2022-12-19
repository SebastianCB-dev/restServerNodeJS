import { Schema, model } from 'mongoose';

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: [true, 'status is required']    
  },
  // A category belongs to a user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  }
});

export const categoryModel = model('Category', categorySchema);