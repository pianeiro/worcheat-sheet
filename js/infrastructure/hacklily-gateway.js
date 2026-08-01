var HACKLILY_URL = 'wss://render.hacklily.org/rpc';
var RENDER_TIMEOUT_MS = 25000;

export function createHacklilyGateway() {
  return {
    render: function (lySource) {
      return new Promise(function (resolve, reject) {
        var ws = new WebSocket(HACKLILY_URL);
        var id = 'rpc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

        ws.onopen = function () {
          ws.send(JSON.stringify({
            id: id,
            jsonrpc: '2.0',
            method: 'render',
            params: {
              backend: 'svg',
              src: lySource,
              version: 'stable',
            },
          }));
        };

        ws.onmessage = function (evt) {
          try {
            var data = JSON.parse(evt.data);
            if (data.id !== id) return;
            ws.close();
            if (data.error) {
              reject(new Error(data.error.message || JSON.stringify(data.error)));
            } else if (data.result) {
              resolve(data.result);
            } else {
              reject(new Error('Unexpected response format'));
            }
          } catch (e) {
            reject(e);
          }
        };

        ws.onerror = function () { reject(new Error('WebSocket connection failed')); };
        ws.onclose = function (evt) {
          if (evt.code !== 1000 && evt.code !== 1005) {
            reject(new Error('WebSocket closed unexpectedly (code ' + evt.code + ')'));
          }
        };

        setTimeout(function () {
          ws.close();
          reject(new Error('Render timed out'));
        }, RENDER_TIMEOUT_MS);
      });
    },
  };
}
