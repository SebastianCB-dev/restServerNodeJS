import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { routerAuth } from '../routes/auth.routes.js';
import { routerCategories } from '../routes/categories.routes.js';
import { routerProducts } from '../routes/products.routes.js';
import { routerSearch } from '../routes/search.routes.js';
import { routerUpload } from '../routes/upload.routes.js';
import { routerUsers } from '../routes/user.routes.js';

import { dbConnection } from '../database/config.db.js';

export class Server {

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT;
    this.paths = {
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      uploads: '/api/uploads',
      users: '/api/users',
      search: '/api/search'
    };
    
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

    // File Upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    })); 
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.categories, routerCategories);
    this.app.use(this.paths.products, routerProducts);
    this.app.use(this.paths.search, routerSearch);
    this.app.use(this.paths.users, routerUsers);
    this.app.use(this.paths.uploads, routerUpload);
  }

  start() {
    this.app.listen(this.PORT, () => {
      console.log(`Server running on port ${this.PORT}`);
    });
  }

}