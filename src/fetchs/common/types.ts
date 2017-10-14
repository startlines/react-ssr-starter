import { Env } from '../../config';

export type Path = string;

export type Param = any;
export type Params = Param[];

export interface Query {
    [key: string]: any;
}

export interface Body {
    [key: string]: any;
}

export interface Headers {
    [key: string]: any;
}

export type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export const Methods: {[method in Method]: Method} = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export interface Api {
    api: Path;
    desc: string;
    headers?: Headers;
    query?: Query;
    body?: Body;
    token?: string;
}

export interface ApiGroup {
    [group: string]: Api;
}

export interface ApiConfig {
    [name: string]: ApiGroup;
}

export interface ServerConfig {
    [server: string]: {
        host: {
            [env in Env]: string;
        };
        apis: Array<Api | ApiGroup>;
    };
}
