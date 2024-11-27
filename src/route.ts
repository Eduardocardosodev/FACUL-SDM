import { Router } from 'express';
import { orderRoutes, productRoutes, userRoutes } from './routes/user.route';
import { verifyToken } from './middleware/authMiddleware';

const router = Router();

// Rotas de usuário (não protegidas, para autenticação inicial)
router.use('/user', userRoutes);

// Rotas de produto (protegidas por autenticação)
router.use('/product', verifyToken, productRoutes);

// Rotas de pedido (protegidas por autenticação)
router.use('/order', verifyToken, orderRoutes);

export default router;
