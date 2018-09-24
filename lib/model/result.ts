export class Result<T> {
    public message = '';
    public ok = false;
    public data: T | undefined;

    // public constructor(options?: { ok: boolean, message: string, data: T | undefined }) {
    //     this.ok = options !== undefined ? options.ok : false;
    //     this.message = options !== undefined ? options.message : '';
    //     this.data = options !== null ? options.data : {};
    // }

    public static success<T>(data: T): Result<T> {
        const result = new Result<T>();
        result.ok = true;
        result.data = data;
        return result;
    }

    public static error<T>(message: string = '') {
        const result = new Result<T>();
        result.message = message;
        return result;
    }
}

export interface NetworkError {
    code: number;
    message: string;
}

export interface NetworkResponse<T> {
    jsonrpc: string;
    id: number;
    result: T;
    error: NetworkError | undefined;
}
