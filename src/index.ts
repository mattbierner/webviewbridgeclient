import { WebViewBridge } from './typings'

/**
 * Client side bridge for communicating with native code
 */
export interface Bridge {
    /**
     * Register a function that can be invoked from native code
     */
    registerHandler<T>(
        handlerName: string,
        handler: (data: T) => void): void

    /**
     * Invoke a native handler.
     */
    callHandler<T>(
        handlerName: string,
        data: any): Promise<T>
}

/**
 * Convenience wrapper around underlying `WebViewBridge`
 */
class AdaptedBridge {
    constructor(
        private _bridge: WebViewBridge
    ) { }

    registerHandler<HandlerData>(handlerName: string, handler: (data: HandlerData) => void): void {
        return this._bridge.registerHandler(handlerName, handler)
    }

    callHandler<CallData, ResponseData>(handlerName: string, data: CallData): Promise<ResponseData> {
        return new Promise((resolve) => {
            this._bridge.callHandler(handlerName, data, resolve)
        })
    }
}

/**
 * Get or create the webview bridge.
 */
export default function getBridge(): Promise<Bridge> {
    if (window.WebViewJavascriptBridge) {
        return Promise.resolve(new AdaptedBridge(window.WebViewJavascriptBridge))
    }
    return new Promise<Bridge>(resolve => {
        const callback = (bridge: WebViewBridge) =>
            resolve(new AdaptedBridge(bridge))

        if (window.WVJBCallbacks) {
            window.WVJBCallbacks.push(callback)
        } else {
            window.WVJBCallbacks = [callback]
            const WVJBIframe = document.createElement('iframe')
            WVJBIframe.style.display = 'none'
            WVJBIframe.src = 'https://__bridge_loaded__'
            document.documentElement.appendChild(WVJBIframe)
            setTimeout(() => { document.documentElement.removeChild(WVJBIframe) }, 0)
        }
    })
}
