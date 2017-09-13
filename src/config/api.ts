/**
 * be fetch apis config.
 */
import { Api } from '../fetchs/common';

export type Server = string;

export interface ApiConfig {
    api: Api;
    desc: string;
}

export type ApiConfigGroup = {
    [server in Server]: ApiConfig;
}

export const APIs = {};

export const Servers = {

};