// npm
import { Context } from 'koa'
// vo
import { Reply } from '../model/vo/reply.vo';
// service
import * as boardService from '../service/board.service'
import * as replyService from '../service/reply.service'
// common
import * as common from '../common/common'
import { ResponseUtil } from '../utils/response.util';



/**
 * Comment: 게시물 조회
 * Date: 2022.08.26
 * @param ctx request, response
 */
export const list = async (ctx: Context) => {
    const query: any = ctx.request.query;
    const result = await boardService.select(query);
    console.log(result)
    if (result !== null) {

    } else {

    }
}



/**
 * Comment: 게시글 등록시 validation check
 * Date: 2022.08.26
 * @param ctx request, response
 * @param param querystring
 * @returns error message
 */
 const registValidation = (param: any): string => {
    let errorMsg = '';

    if (common.isNull(param.username) || param.username === '') {
        errorMsg = `'작성자(username)' 를 입력해주세요.`;
    } else if (common.isNull(param.password) || param.password === '') {
        errorMsg = `'비밀번호(password)' 를 입력해주세요.`;
    } else if (common.isNull(param.title) || param.title === '') {
        errorMsg = `'제목(title)' 을 입력해주세요.`;
    }  
    return errorMsg;
}

/**
 * Comment: 게시글을 등록
 * Date: 2022.08.25
 * @param ctx request, response
 */
export const regist = async (ctx: Context) => {
    let response;
    const body = ctx.request.body;
    const errorMsg = registValidation(body);     
    if (errorMsg !== '') {
        response = ResponseUtil.badRequestError(ctx.request, errorMsg, 'board.controller.ts', 'regist');
        ctx.response.status = response.statusCode;
        ctx.body = response.body;
        return;
    }

    const result = await boardService.insert(body);
    if (result !== null) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'regist');
    } else {

    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

/**
 * Comment: 게시물 수정 (비밀번호가 같을 경우에만 수정 가능)
 * Date: 2022.08.25
 * @param ctx request, response
 */
export const update = async (ctx: Context) => {
    const body = ctx.request.body;
    const result = await boardService.update(body);
    if (result !== null) {

    } else {
        
    }
}

/**
 * Comment: 게시물 삭제 (비밀번호가 같을 경우에만 삭제 가능)
 * @param ctx request, response
 */
export const remove = async (ctx: Context) => {
    const body = ctx.request.body;
    const result = await boardService.remove(body);
    if (result !== null) {

    } else {
        
    }
}

/**
 * Comment: 댓글 등록
 * Date: 2022.08.26
 * @param ctx request, response
 */
 export const registReply = async (ctx: Context) => {
    const body = ctx.request.body;
    const reply: Reply = {
        tbId: body.tbId,
        username: body.username,
        content: body.content,
        depth: body.depth,
        parentId: body.parentId
    }
    const result = await replyService.insert(reply);
    if (result !== null) {

    } else {

    }
}