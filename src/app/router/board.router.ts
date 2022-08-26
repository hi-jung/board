// npm
import Router from 'koa-router';

// controller
import * as boardCtrl from '../controller/board.controller';
import * as replyCtrl from '../controller/reply.controller';
import * as keywordCtrl from '../controller/keyword.controller';

const BoardRouter = new Router();

BoardRouter.get('/board', boardCtrl.list);
BoardRouter.get('/board/:id', boardCtrl.list);
BoardRouter.post('/board', boardCtrl.regist);
BoardRouter.put('/board', boardCtrl.update);
BoardRouter.delete('/board', boardCtrl.remove);

BoardRouter.get('/reply', replyCtrl.list);
BoardRouter.post('/reply', replyCtrl.regist);

BoardRouter.post('/keyword', keywordCtrl.regist);

export { BoardRouter };