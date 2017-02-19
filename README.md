# WebViewBridgeClient

Client-side component of [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge) for sending messages between native code and WebViews on iOS.

# Usage

```bash
npm install --save webviewbridgeclient
```

See complete example [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge#examples)

```js
import getBridge from 'webviewbridgeclient'

getBridge().then(bridge => {
   bridge.registerHandler('JS Echo', (data, responseCallback) => {
        console.log("JS Echo called with:", data)
        responseCallback(data)
    })

    bridge.callHandler('ObjC Echo', {'key': 'value'}).then(responseData => {
        console.log("JS received response:", responseData)
    })
})
```

# Credits
Basic client side bridge code from [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)