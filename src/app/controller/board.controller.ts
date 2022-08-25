import { Context } from 'koa'

import * as boardService from '../service/board.service'

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
 * Comment: 게시글을 등록
 * Date: 2022.08.25
 * @param ctx request, response
 */
export const regist = async (ctx: Context) => {
    const body = ctx.request.body;
    const result = await boardService.insert(body);
    if (result !== null) {

    } else {

    }
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

export const remove = async (ctx: Context) => {
    const body = ctx.request.body;
    const result = await boardService.remove(body);
    if (result !== null) {

    } else {
        
    }
}