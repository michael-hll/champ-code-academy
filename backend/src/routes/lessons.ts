import { Router } from 'express';
import { lessons } from '../data/lessons'
const router = Router();

// GET /api/lessons
router.get('/', (req, res) => {
  // optional query filters: ?type=Available&month=2026-01
  const { type, month } = req.query;
  let result = lessons;

  if (type) {
    result = result.filter(l => l.type.toLowerCase() === String(type).toLowerCase());
  }
  if (month) {
    result = result.filter(l => l.date.startsWith(String(month))); // expects yyyy-mm
  }
  res.json(result);
});

// GET /api/lessons/:id
router.get('/:id', (req, res) => {
  const item = lessons.find(l => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

// POST /api/lessons/:id/take  -> mock 'take class' action
router.post('/:id/take', (req, res) => {
  const item = lessons.find(l => l.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  if (item.status !== 'Available') return res.status(400).json({ error: 'Not available' });
  item.status = 'Confirmed';
  item.tutor = 'Demo Tutor';
  res.json(item);
});

export default router;