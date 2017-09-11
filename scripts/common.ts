export interface TaskOptions {
    name?: string;
}

export interface Task<T> {
    run(options?: TaskOptions): Promise<T>;
}
