import { Schema, model } from 'mongoose';

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, 'role is required']
  }
});

export const roleModel = model('Role', roleSchema);