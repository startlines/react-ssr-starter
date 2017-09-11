import 'isomorphic-fetch';
import { Api, Method, Methods } from './types';
import { Url } from './url';

export interface HttpOptions {

}

export interface FetchOptions {

}

export class Http {

    private _options: HttpOptions;

    private _url: Url;

    constructor(options: HttpOptions) {
        this._options = options;
        this._url = new Url({

        });
    }

    get<T>(options: FetchOptions) {
        return this._buildMethod<T[]>(Methods.GET, options);
    }

    post<T>(options: FetchOptions) {
        return this._buildMethod<T>(Methods.POST, options);
    }

    put<T>(options: FetchOptions) {
        return this._buildMethod<T>(Methods.PUT, options);
    }

    patch<T>(options: FetchOptions) {
        return this._buildMethod<T>(Methods.PATCH, options);
    }

    delete<T>(options: FetchOptions) {
        return this._buildMethod<T>(Methods.DELETE, options);
    }

    private _buildMethod<T>(method: Method, options: FetchOptions) {
        const result: { result: T, req?: Request, res?: Response };
    }

}
