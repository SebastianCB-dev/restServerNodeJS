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

categorySchema.methods.toJSON = function() {
  const { __v, _id, status, ...data } = this.toObject();
  data.uid = _id;
  return data;
}

export const categoryModel = model('Category', categorySchema);