export interface WebViewBridge {
    registerHandler<Data>(
        handlerName: string,
        handler: (data: Data, responseCallback: () => void) => void
    ): void

    callHandler<CallData, ResponseData>(
        handlerName: string,
        data: CallData,
        responseCallback: (data: ResponseData) => void
    ): void
}

declare global {
    interface Window {
        WebViewJavascriptBridge: WebViewBridge
        WVJBCallbacks: Array<(WebViewBridge) => void>
    }
}