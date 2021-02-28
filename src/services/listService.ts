import { AppError, processError } from '@/models/error';
import { List } from '@/models/list';
import { ListItem } from '@/models/listItem';
import axios from 'axios';

export async function loadList ( id: string ): Promise<List | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_BASE}/list/${id}` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}

export async function loadListItems ( id: string ): Promise<ListItem[] | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_BASE}/list/${id}/item` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}