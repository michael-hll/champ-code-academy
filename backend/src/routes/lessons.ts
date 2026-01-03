import { Router } from 'express';
import { lessons } from '../data/lessons'
const router = Router();

// GET /api/lessons
router.get('/', (req, res) => {
  // optional query filters: ?type=Available&startDate=2026-01-01&endDate=2026-01-31
  const { type, startDate, endDate } = req.query;
  let result = lessons;

  if (type) {
    result = result.filter(l => l.type.toLowerCase() === String(type).toLowerCase());
  }
  
  if (startDate || endDate) {
    result = result.filter(l => {
      const lessonDate = new Date(l.date);
      const start = startDate ? new Date(String(startDate)) : null;
      const end = endDate ? new Date(String(endDate)) : null;
      
      // Set time to start/end of day for proper comparison
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999);
      
      if (start && end) {
        return lessonDate >= start && lessonDate <= end;
      } else if (start) {
        return lessonDate >= start;
      } else if (end) {
        return lessonDate <= end;
      }
      return true;
    });
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
  
  // For demo purposes, if already confirmed, just return it
  // In production, you'd check the actual database state
  if (item.status !== 'Available') {
    return res.json(item); // Return the lesson as-is if already taken
  }
  
  // Update status and tutor
  item.status = 'Confirmed';
  item.tutor = 'Sarah Tan'; // mock tutor assignment
  
  // Update type based on the lesson date
  const lessonDate = new Date(item.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lessonDate.setHours(0, 0, 0, 0);
  
  if (lessonDate.getTime() === today.getTime()) {
    item.type = 'Today';
  } else if (lessonDate > today) {
    item.type = 'Upcoming';
  } else {
    item.type = 'Historic';
  }
  
  res.json(item);
});

export default router;