
export interface AppError {
    errors: string;
    message: string;
    statusCode: number;
    statusText: string;
}

export function processError ( error: any ) {
    const { statusText, data: { errors, message, status } } = error.response;

    return {
        statusText,
        errors,
        message,
        statusCode: status
    } as AppError;
}

export function isAppError ( toBeDetermined: AppError | any ): toBeDetermined is AppError {
    if ( ( toBeDetermined as AppError ).errors ) {
        return true
    }
    return false
}