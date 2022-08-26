
export interface Reply {
    trId?: number;
    tbId: number;
    username: string;
    content: string;
    depth: number;
    parentId: number;
    reComment?: Array<Reply>;
}