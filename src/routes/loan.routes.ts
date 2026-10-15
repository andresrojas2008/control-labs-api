import { Router } from 'express';
import { getLoans } from '../controllers/loan.controller';

const router = Router();

router.get('/', getLoans);

export default router;
