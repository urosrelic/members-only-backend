import { Router } from 'express';
import { createRole, getAllRoles } from '../controllers/role.controller';

const router = Router();

router.get('/', getAllRoles);

router.post('/', createRole);

export default router;
