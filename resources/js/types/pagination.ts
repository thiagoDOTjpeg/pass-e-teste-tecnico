export interface PaginationData<T> {
    data: T[] | []
}

export interface PaginationInfo {
    current_page: number,
    last_page: number,
    first_page_url: string,
    prev_page_url: string | null,
    next_page_url: string | null,
    last_page_url: string | null,
    from: number | null,
    to: number | null,
    path: string,
    per_page: number,
    total: number,
    links: {
        url: string | null,
        label: string,
        page: number,
        active: boolean
    }[],
}

export interface PaginatedResponse<T> extends PaginationData<T>, PaginationInfo  {
}