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
import { ResponseBodyVO, ResponseVO } from '../model/vo/response.vo';


/**
 * Comment: 댓글 조회
 * Date: 2022.08.26
 * @param ctx request, response
 */
 export const list = async (ctx: Context) => {
    let response;
    const query: any = ctx.request.query;
    if (query.page < 1 || common.isNull(query.page)) {
        response = ResponseUtil.badRequestError(ctx.request, `'page'는 1 이상 이어야 합니다.`, 'reply.controller.ts', 'list');
        ctx.response.status = response.statusCode;
        ctx.body = response.body;
        return;
    }

    // 1) 댓글 조회
    const result = await getComment(query);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'reply.controller.ts', 'list', result.data);
    } else {
        response = ResponseUtil.error(ctx.request, result, 'reply.controller.ts', 'list')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

/**
 * Comment: 댓글 조회 함수
 * Date: 2022.08.07
 * @param query 
 * @returns 댓글 리스트
 */
const getComment = async (query: any): Promise<ResponseBodyVO> => {
    // 1) 댓글 조회
    const paging = common.getPaging(parseInt(query.page), parseInt(query.viewCount));
    const commentResult = await replyService.select(query, 0, paging);
    if (commentResult.code !== StatusCode.CODE_200_000) {
        return commentResult;
    }

    let commentList: Array<Reply> = [];
    for (let i = 0; i < commentResult.data.length; i++) {
        let comment: Reply = {
            trId: commentResult.data[i].TR_ID,
            tbId: commentResult.data[i].TB_ID,
            username: commentResult.data[i].TR_USERNAME,
            content: commentResult.data[i].TR_CONTENT,
            depth: commentResult.data[i].TR_DEPTH,
            parentId: commentResult.data[i].TR_PARENT_ID,
            reComment: []
        }

        // 2) 대댓글 조회
        query.parentId = comment.parentId;
        const reCommentResult = await replyService.select(query, 1);
        if (reCommentResult.code !== StatusCode.CODE_200_000) {
            return reCommentResult;
        }
        for (let j = 0; j < reCommentResult.data.length; j++) {
            let reComment: Reply = {
                trId: reCommentResult.data[i].TR_ID,
                tbId: reCommentResult.data[i].TB_ID,
                username: reCommentResult.data[i].TR_USERNAME,
                content: reCommentResult.data[i].TR_CONTENT,
                depth: reCommentResult.data[i].TR_DEPTH,
                parentId: reCommentResult.data[i].TR_PARENT_ID
            }
            comment.reComment?.push(reComment);
        }
        commentList.push(comment)
    }
    commentResult.data = commentList;
    return commentResult;
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

    // 1) 댓글 등록
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