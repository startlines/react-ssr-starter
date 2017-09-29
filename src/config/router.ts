/**
 * fe router config.
 */
interface Route {
    path: string;
    name?: string;
    title?: string;
    children?: Route[];
}

export const Router: Route[] = [

];
