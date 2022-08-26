// npm
import { Context } from 'koa'
// service
import * as boardService from '../service/board.service'
// common
import * as common from '../common/common'
import { ResponseUtil } from '../utils/response.util';
import { StatusCode } from '../common/statuscode';


/**
 * Comment: 게시물 조회
 * Date: 2022.08.26
 * @param ctx request, response
 */
export const list = async (ctx: Context) => {
    let response;
    const query: any = ctx.request.query;

    if (query.page < 1) {
        response = ResponseUtil.badRequestError(ctx.request, `'page'는 1 이상 이어야 합니다.`, 'board.controller.ts', 'list');
        ctx.response.status = response.statusCode;
        ctx.body = response.body;
        return;
    }

    const paging = common.getPaging(parseInt(query.page), parseInt(query.viewCount));
    const result = await boardService.select(query, paging);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'list', result);
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'list')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
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
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'regist', {});
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'regist')
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
    let response;
    const body = ctx.request.body;
    const result = await boardService.update(body);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'update', {});
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'update')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}


/**
 * Comment: 게시물 삭제 (비밀번호가 같을 경우에만 삭제 가능)
 * @param ctx request, response
 */
export const remove = async (ctx: Context) => {
    let response;
    const body = ctx.request.body;
    const result = await boardService.remove(body);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'remove', {});
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'remove')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}