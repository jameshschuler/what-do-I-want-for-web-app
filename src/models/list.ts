import { ListItem } from './listItem';

export interface List {
    name: string;
    createdAt: string;
    createdBy: string;
    wantListId: number;
    specialId: string;
    published: boolean;
}

export interface CreateListRequest {
    name: string;
    createdBy: string;
}

export interface UpdateListRequest {
    name: string;
    updatedBy?: string;
}

export interface NewList {
    name: string;
    createdBy: string;
}

export interface EditList {
    createdAt: string;
    createdBy: string;
    name: string;
    listItems: ListItem[];
    specialId: string;
    wantListId: number;
}