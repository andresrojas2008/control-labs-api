import { Router } from 'express';
import { IncidentController } from '../controllers/incident.controller';

const router = Router();
router.post('/', IncidentController.create);
router.get('/', IncidentController.list);
router.patch('/:id', IncidentController.patch);

export default router;
