import { Router } from 'express';

import { search } from '../controllers/search.controller.js';

export const routerSearch = Router();


routerSearch.get('/:collection/:term', search)