import express from 'express';
import cors from 'cors';
import { router } from '../routes/user.routes.js';
import { dbConnection } from '../database/config.db.js';

export class Server {

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.usersRoutePath = '/api/users';

    // Connection DB
    this.connectDB();
    // Middlewares
    this.middlewares();
    // Routes
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // JSON's Reading and Parsing
    this.app.use(express.json());
    // CORS
    this.app.use(cors());
    // Public Dir
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.usersRoutePath, router);
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  }

}