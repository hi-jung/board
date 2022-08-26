// npm
import { Context } from 'koa'
// vo
import { Reply } from '../model/vo/reply.vo';
// service
import * as replyService from '../service/reply.service'
// common
import * as common from '../common/common'
import { ResponseUtil } from '../utils/response.util';
import { StatusCode } from '../common/statuscode';


/**
 * Comment: 댓글 조회
 * Date: 2022.08.26
 * @param ctx request, response
 */
 export const list = async (ctx: Context) => {
    let response;
    const query: any = ctx.request.query;
    if (query.page < 1) {
        response = ResponseUtil.badRequestError(ctx.request, `'page'는 1 이상 이어야 합니다.`, 'reply.controller.ts', 'list');
        ctx.response.status = response.statusCode;
        ctx.body = response.body;
        return;
    }

    const paging = common.getPaging(parseInt(query.page), parseInt(query.viewCount));
    const result = await replyService.select(query, paging);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'reply.controller.ts', 'list', result);
    } else {
        response = ResponseUtil.error(ctx.request, result, 'reply.controller.ts', 'list')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

/**
 * Comment: 댓글 등록
 * Date: 2022.08.26
 * @param ctx request, response
 */
 export const regist = async (ctx: Context) => {
    let response;
    const body = ctx.request.body;
    const reply: Reply = {
        tbId: body.tbId,
        username: body.username,
        content: body.content,
        depth: body.depth,
        parentId: body.parentId || 0
    }
    const result = await replyService.insert(reply);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'reply.controller.ts', 'regist', {});
    } else {
        response = ResponseUtil.error(ctx.request, result, 'reply.controller.ts', 'regist')
    }   
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}