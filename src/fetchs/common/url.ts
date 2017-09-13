import { Api, Params, Query } from './types';
import { ApiConfig } from '../../config';

interface UrlOptions {

}

export class Url {

    private _options: UrlOptions;

    constructor(options: UrlOptions) {
        this._options = options;
    }

    create(api: ApiConfig, params: Params, query: Query): Api {
        return '';
    }
}
