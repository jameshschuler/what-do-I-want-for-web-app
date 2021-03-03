export interface List {
    name: string;
    createdAt: string;
    createdBy: string;
    wantListId: string;
    specialId: string;
}

export interface CreateListRequest {
    name: string;
    createdBy: string;
}