
export interface RequestParam {
    page: number,
    viewCount: number,
    searchList?: Array<SearchParam>
}

export interface SearchParam {
    key: string;
    value: string;
}

export interface Paging {
    offset: number;
    limit: number
}