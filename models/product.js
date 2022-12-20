import { Schema, model } from 'mongoose';

const productSchema = Schema({
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
  // A product belongs to a user
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  prize: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'category is required']
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  }
});

productSchema.methods.toJSON = function () {
  const { __v, _id, status, ...data } = this.toObject();
  data.uid = _id;
  return data;
}

export const productModel = model('Product', productSchema);