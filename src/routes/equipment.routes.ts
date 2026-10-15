import { Router } from 'express';
import { EquipmentController } from '../controllers/equipment.controller';

const router = Router();
router.post('/', EquipmentController.create);
router.get('/', EquipmentController.list);
router.patch('/:id', EquipmentController.patch);

export default router;
