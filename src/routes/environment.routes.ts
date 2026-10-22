import { Router } from 'express';
import { EnvironmentController } from '../controllers/environment.controller';
import { validateEnvironmentPayload } from '../middlewares/validateEnvironment.middleware';

const router = Router();

router.get('/', EnvironmentController.getEnvironments);
router.post('/', validateEnvironmentPayload, EnvironmentController.createEnvironment);
router.patch('/:id', EnvironmentController.updateEnvironment);

export default router;
