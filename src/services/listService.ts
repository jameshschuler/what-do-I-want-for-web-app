import { AppError, processError } from '@/models/error';
import { List } from '@/models/list';
import axios from 'axios';

export async function loadList ( id: string ): Promise<List | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_BASE}/list/${id}` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}