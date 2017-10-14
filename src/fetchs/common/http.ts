import 'isomorphic-fetch';
import { Log } from '../../helper';
import { Api, Body, Headers, Method, Methods, Params, Query } from './types';
import { Url } from './url';

export interface HttpOptions {
    debug?: boolean;
}

export interface FetchOptions {
    api: Api;
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
            env: 'dev',
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

        const req = result.req = new Request(this._url.get(api, params, query), init);

        if (this._options.debug) this._reqLog(req);

        const res = result.res = await fetch(req);

        if (this._options.debug) this._resLog(res);

        return result;
    }

    private _reqLog(req: Request) {
        Log.log(JSON.stringify(req));
    }

    private _resLog(res: Response) {
        Log.log(JSON.stringify(res));
    }

}
