export type Api = string;

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
