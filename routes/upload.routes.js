import { Router } from 'express';
import { check } from 'express-validator';

import { showImage, 
         updateImageCloudinaryController,  
         uploadFileController } from '../controllers/upload.controller.js';

import { allowedCollections } from '../helpers/db-validators.js';

import { middlewares } from '../middlewares/index.js';

export const routerUpload = Router();


routerUpload.post('/', [  
  middlewares.fileValidatorUpload
], uploadFileController);

routerUpload.put('/:collection/:id', [
  middlewares.fileValidatorUpload,
  check('id', 'Not a valid ID').isMongoId(),
  check('collection').custom( c => allowedCollections( c, ['users', 'products'] ) ),
  middlewares.fieldsValidator
], updateImageCloudinaryController );

routerUpload.get('/:collection/:id', [
  check('id', 'Not a valid ID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  middlewares.fieldsValidator
], showImage);