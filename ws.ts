namespace tmnet {
    let lastLabel = "none";
    export function init() {
        control.simmessages.onReceived("tm", (buf: Buffer) => {
            const str = buf.toString();
            const search = "\"label\":\"";
            const start = str.indexOf(search);
            if (start >= 0) {
                const valStart = start + search.length;
                lastLabel = str.slice(valStart, str.indexOf("\"", valStart));
            }
        });
    }
    export function getLabel(): string { return lastLabel; }
}