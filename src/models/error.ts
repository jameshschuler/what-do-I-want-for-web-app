
export interface AppError {
    errors: ValidationError[];
    message: string;
    statusCode: number;
    statusText: string;
}

export interface ValidationError {
    message: string;
    path: string;
}

export function processError ( error: any ) {
    console.log( 'error' )
    const { statusText, data: { errors, message, status } } = error.response;

    const appError = {
        statusText,
        errors: errors || [],
        message: message || 'Oops! Something went wrong please try again.',
        statusCode: status || 500
    } as AppError;

    console.log( appError )
    return appError;
}

export function isAppError ( toBeDetermined: AppError | any ): toBeDetermined is AppError {
    if ( ( toBeDetermined as AppError ).errors ) {
        return true
    }
    return false
}