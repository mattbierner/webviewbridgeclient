"use strict";
/**
 * Convenience wrapper around underlying `WebViewBridge`
 */
class AdaptedBridge {
    constructor(_bridge) {
        this._bridge = _bridge;
    }
    registerHandler(handlerName, handler) {
        return this._bridge.registerHandler(handlerName, handler);
    }
    callHandler(handlerName, data) {
        return new Promise((resolve) => {
            this._bridge.callHandler(handlerName, data, resolve);
        });
    }
}
/**
 * Get or create the webview bridge.
 */
function getBridge() {
    if (window.WebViewJavascriptBridge) {
        return Promise.resolve(new AdaptedBridge(window.WebViewJavascriptBridge));
    }
    return new Promise(resolve => {
        const callback = (bridge) => resolve(new AdaptedBridge(bridge));
        if (window.WVJBCallbacks) {
            window.WVJBCallbacks.push(callback);
        }
        else {
            window.WVJBCallbacks = [callback];
            const WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'https://__bridge_loaded__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(() => { document.documentElement.removeChild(WVJBIframe); }, 0);
        }
    });
}
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get or create the webview bridge.
 */
exports.default = getBridge;
