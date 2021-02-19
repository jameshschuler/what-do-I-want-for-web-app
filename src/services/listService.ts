import { AppError, processError } from '@/models/error';
import { List } from '@/models/list';
import axios from 'axios';

export async function loadList ( id: number ): Promise<List | AppError> {
    try {
        const response = await axios.get( `${process.env.VUE_APP_API_URL}/list/${id}` );

        return response.data;
    } catch ( err ) {
        return processError( err );
    }
}