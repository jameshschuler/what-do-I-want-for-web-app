import { AppError, processError } from '@/models/error';
import { CreateListRequest, List, UpdateListRequest } from '@/models/list';
import { ListItem } from '@/models/listItem';
import axios from 'axios';

export async function createList ( createListRequest: CreateListRequest ): Promise<string | AppError> {
    try {
        const response = await axios.post( `${process.env.VUE_APP_API_BASE}/list`, createListRequest );

        return response.headers.location;
    } catch ( err ) {
        return processError( err );
    }
}

export async function loadList ( id: string ): Promise<List | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_BASE}/list/${id}` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}

export async function loadListItems ( id: number ): Promise<ListItem[] | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_BASE}/list/${id}/item` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}

export async function updateList ( specialId: string, updateListRequest: UpdateListRequest ): Promise<string | AppError> {
    try {
        console.log( updateListRequest );
        const response = await axios.put( `${process.env.VUE_APP_API_BASE}/list/${specialId}`, updateListRequest );

        return response.headers.location;
    } catch ( err ) {
        return processError( err );
    }
}