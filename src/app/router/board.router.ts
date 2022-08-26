// npm
import Router from 'koa-router';

// controller
import * as boardCtrl from '../controller/board.controller';

const BoardRouter = new Router();

BoardRouter.get('/board', boardCtrl.list);
BoardRouter.get('/board/:id', boardCtrl.list);
BoardRouter.post('/board', boardCtrl.regist);
BoardRouter.put('/board', boardCtrl.update);
BoardRouter.delete('/board', boardCtrl.remove);

BoardRouter.post('/reply', boardCtrl.registReply);

export { BoardRouter };