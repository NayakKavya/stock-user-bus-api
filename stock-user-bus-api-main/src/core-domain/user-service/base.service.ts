/**
 * This interface contains methods declaration for services 
 */
export interface IBaseService<TInput, TResult> {
    handle(data?: TInput, param?: any):
        Promise<TResult> | Promise<TResult[]>;
}