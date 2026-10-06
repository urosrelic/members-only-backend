import { Router } from 'express';
import {
  createClubhouse,
  getAllClubhouses,
} from '../controllers/clubhouse.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getAllClubhouses);

router.post('/', authenticate, authorize('USER'), createClubhouse);

export default router;
