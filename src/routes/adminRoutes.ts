import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';

const router = Router();

router.use(authMiddleware);
router.use(requireRole(['admin']));

router.get('/stats', (_req, res) => {
  res.json({
    message: 'Admin stats endpoint',
    totalUsers: 0, // you can keep simple/hardcoded
  });
});

export default router;
