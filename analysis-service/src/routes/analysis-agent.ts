import { Router} from 'express';
import { analysisAgent } from '../controllers/analysis-agent';

const router = Router();

router.post('/analyze', analysisAgent);


export default router;