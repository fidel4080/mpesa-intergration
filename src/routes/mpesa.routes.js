import express from 'express';
import { stkPush, mpesaCallback} from '../controllers/mpesa.controller.js'


const router = express.Router();

router.post('/stk-push', stkPush);
router.post('/callback', mpesaCallback);


export default router;