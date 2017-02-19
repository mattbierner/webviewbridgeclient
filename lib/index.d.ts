/**
 * Client side bridge for communicating with native code
 */
export interface Bridge {
    /**
     * Register a function that can be invoked from native code
     */
    registerHandler<T>(handlerName: string, handler: (data: T) => void): void;
    /**
     * Invoke a native handler.
     */
    callHandler<T>(handlerName: string, data: any): Promise<T>;
}
/**
 * Get or create the webview bridge.
 */
export default function getBridge(): Promise<Bridge>;
