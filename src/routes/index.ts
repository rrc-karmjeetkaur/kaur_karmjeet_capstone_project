import { Router } from 'express';
import { getStatus } from '../controllers/indexController';

const router = Router();

router.get('/', getStatus);

export default router;
