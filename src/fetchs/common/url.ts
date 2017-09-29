import { Env } from '../../config';
import { Api, ApiConfig, Params, Query } from './types';

interface UrlOptions {
    env: Env;
}

export class Url {

    constructor(private _options: UrlOptions) {

    }

    get(api: ApiConfig, params: Params, query: Query): Api {
        return '';
    }
}
