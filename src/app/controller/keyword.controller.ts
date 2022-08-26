// npm
import { Context } from 'koa'
// service
import * as keywordService from '../service/keyword.service'
// common
import * as common from '../common/common'
import { ResponseUtil } from '../utils/response.util';
import { StatusCode } from '../common/statuscode';
import { Board } from '../model/vo/board.vo';

/**
 * Comment: 키워드 등록
 * Date: 2022.08.27
 * @param ctx request, response
 */
 export const regist = async (ctx: Context) => {
    let response;
    const body = ctx.request.body;

    const result = await setKeyword(body);
    if (result.code === StatusCode.CODE_200_000) {
        response = ResponseUtil.success(ctx.request, 'keyword.controller.ts', 'regist', {});
    } else {
        response = ResponseUtil.error(ctx.request, result, 'keyword.controller.ts', 'regist')
    }
    ctx.response.status = response.statusCode;
    ctx.body = response.body;
    return;
}

const setKeyword = async (body: any) => {
    if (!common.isNull(body.keyword) && body.keyword !== '') {
        const keyword = body.keyword.replace(/ /gi, '');

        let keywordList: Array<string> = [];
        if (keyword.includes(',')) {
            keywordList = keyword.split(',');
        } else {
            keywordList.push(keyword);
        }
        const keywordResult = await keywordService.insert(body.username, keywordList);
        return keywordResult;

    } else {
        return {
            code: StatusCode.CODE_400_000,
            codeDesc: StatusCode.DESC_400_000 + '(keyword를 입력해주세요.)',
            data: {}
        };
    }
}