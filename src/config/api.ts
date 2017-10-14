/**
 * be fetch apis config.
 */
import { ApiConfig, ServerConfig } from '../fetchs/common/types';

// backend api config.
// Notes: need register in Servers config.
export const APIs: ApiConfig = {
    blog: {
        articles: {
            api: '/articles',
            desc: 'articles api.',
        },
    },

    common: {
        tags: {
            api: '/tags',
            desc: 'tags api.',
        },
        categories: {
            api: '/categories',
            desc: 'categories api.',
        },
    },
};

// backend server config.
export const Servers: ServerConfig = {
    be: {
        host: {
            dev: 'https://localhost:8080',
            prod: 'https://localhost:8080',
        },
        apis: [
            APIs.blog,
            APIs.common,
        ],
    },
};
