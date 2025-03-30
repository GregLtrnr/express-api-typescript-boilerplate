import express from 'express';
import templateRouter from './template';

const router = express.Router();

// Initialize routers
router.use('/template', templateRouter);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Default route for 404
router.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

export default router;
