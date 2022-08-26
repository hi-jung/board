// npm
import { Context } from 'koa'
// service
import * as boardService from '../service/board.service'
// common
import * as common from '../common/common'
import { ResponseUtil } from '../utils/response.util';
import { StatusCode } from '../common/statuscode';
import { Board } from '../model/vo/board.vo';
import { logger } from '../utils/logger.util';


/**
 * Comment: 게시물 조회
 * Date: 2022.08.26
 * @param ctx request, response
 */
export const list = async (ctx: Context) => {
    let response;
    const query: any = ctx.request.query;

    if (query.page < 1 || common.isNull(query.page)) {
        response = ResponseUtil.badRequestError(ctx.request, `'page'는 1 이상 이어야 합니다.`, 'board.controller.ts', 'list');
        ctx.response.status = response.statusCode;
        ctx.body = response.body;
        return;
    }
    
    // 1) 게시물 조회
    const result = await getBoardList(query);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'board.controller.ts', 'list', result.data);
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'list')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

const getBoardList = async (query: any) => {
    const paging = common.getPaging(parseInt(query.page), parseInt(query.viewCount));
    const boardResult = await boardService.select(query, paging);
    if (boardResult.code !== StatusCode.CODE_200_000) {
        return boardResult;
    }

    let boarList: Array<Board> = [];
    for (let i = 0; i < boardResult.data.length; i++) {
        const board: Board = {
            tbId: boardResult.data[i].TB_ID,
            username: boardResult.data[i].TB_USERNAME,
            title: boardResult.data[i].TB_TITLE,
            content: boardResult.data[i].TB_CONTENT,
            registDate: boardResult.data[i].TB_REGIST_DATE,
            updateDate: boardResult.data[i].TB_UPDATE_DATE
        }
        boarList.push(board);
    }
    boardResult.data = boarList;
    return boardResult;
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

        // !!) 키워드 체크
        try {
            keywordCheck(body.content);
        } catch(e) {
            // keyword 체크시 오류 발생하더라도 게시글 등록은 정상적으로 이루어져야 함
            logger.error(e)
        }
    } else {
        response = ResponseUtil.error(ctx.request, result, 'board.controller.ts', 'regist')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

const keywordCheck = (content: string) => {
    /**
     * 추후 구현 예정
     * 1) 게시글 등록시 키워드 체크를 위해 키워드 체크만 하는 서버로 이벤트 전송 (ex. mqtt)
     * 2) 키워드 체크 후 푸쉬를 발송하는 서버에서 키워드 체크 후 푸쉬 발송
     */
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