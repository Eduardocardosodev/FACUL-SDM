import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import router from './route';

export const app = express();

// Configuração de CORS com TypeScript
const corsOptions = {
  origin: 'https://seusite.com', // Apenas origens confiáveis
};
app.use(cors(corsOptions));

// Configuração de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 requisições por IP
  message: 'Muitas requisições. Tente novamente mais tarde.',
});
app.use(limiter);

// Logs de requisições com Morgan
app.use(morgan('combined'));

// Parsing de JSON
app.use(express.json());

// Rotas da aplicação
app.use(router);
