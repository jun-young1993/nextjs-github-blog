import {GithubContentInterface} from "@/interfaces/github-user.interface";

export interface BlogErrorLike {
	status: number;
	statusText: Error;
}
export const isObject = (object: unknown): object is Record<string, unknown> => {
	return typeof object === 'object' && object !== null && !Array.isArray(object);
};
      
export const isBlogError = (error: unknown): error is BlogErrorLike => {
	if (!isObject(error)) return false;
      
	if (error instanceof Error) return true;
      
	return findError(error);
};
function findError<T extends object>(error: T): boolean {
	if (Object.prototype.toString.call(error) === '[object Error]') {
	  return true;
	}
      
	const prototype = Object.getPrototypeOf(error) as T | null;
      
	return prototype === null ? false : findError(prototype);
      }
