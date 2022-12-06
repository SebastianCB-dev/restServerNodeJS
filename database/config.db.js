import mongoose from 'mongoose';
import colors from 'colors';

export const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database online'.green);
  }
  catch(error) {
    throw new Error('Error with the db connection!:'.red, error);
  }
}
