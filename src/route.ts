import { Router } from 'express';
import { orderRoutes, productRoutes, userRoutes } from './routes/user.route';

const router = Router();

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);

export default router;
