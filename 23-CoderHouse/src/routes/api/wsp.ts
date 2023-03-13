import { Context, Next } from 'koa';
import Router from 'koa-router';
import { mandarWspARemitente} from '../../services/twilio';

const router = new Router();

router.post('/', (ctx: Context | any, next: Next) => {
    //let message = req.body.body;
    let senderID = ctx.request.body.From;

    mandarWspARemitente('mensaje de prueba', senderID);
})

export default router.routes();