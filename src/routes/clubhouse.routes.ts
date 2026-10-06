import { Router } from 'express';
import { createClubhouse } from '../controllers/clubhouse.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, authorize('USER'), createClubhouse);

export default router;
