export interface Route {
    path: string;
    name?: string;
    title?: string;
    children?: Route[];
}

export type RouterConfig = Route[];
