namespace tmnet {

    let socket: WebSocket;
    let lastLabel = "none";
    let lastConfidence = 0;

    export function connect(url: string) {
        socket = new WebSocket(url);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            lastLabel = data.label;
            lastConfidence = data.confidence;
        };
    }

    export function getLabel() {
        return lastLabel;
    }

    export function getConfidence() {
        return lastConfidence;
    }
}