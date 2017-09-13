import 'isomorphic-fetch';
import { Api, Params, Query, Body, Headers, Method, Methods } from './types';
import { ApiConfig } from '../../config';
import { Url } from './url';

export interface HttpOptions {
    debug?: boolean;
}

export interface FetchOptions {
    api: ApiConfig;
    params?: Params;
    query?: Query;
    body?: Body;
    headers?: Headers;
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

    private async _buildMethod<T>(method: Method, options: FetchOptions) {
        const { api, params, query, body, headers } = options;
        const result: { result: Promise<T>, req?: Request, res?: Response } = { result: null };

        const init: RequestInit = {};

        const req = result.req = new Request(this._url.create(api, params, query), init);

        if (this._options.debug) this._reqLog(req);

        const res = result.res = await fetch(req);

        if (this._options.debug) this._resLog(res);

        return result;
    }

    private _reqLog(req: Request) {
        console.log(JSON.stringify(req));
    }

    private _resLog(res: Response) {
        console.log(JSON.stringify(res));
    }

}
