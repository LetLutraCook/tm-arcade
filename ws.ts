namespace tmnet {

    let lastLabel = "none";
    let lastConfidence = 0;

    export function init() {
        control.simmessages.onReceived("tm", (buf: Buffer) => {
            const str = buf.toString();
            lastLabel = extractString(str, "label");
            lastConfidence = extractNumber(str, "confidence");
        });
    }

    function extractString(json: string, key: string): string {
        const search = "\"" + key + "\":\"";
        const start = json.indexOf(search);
        if (start < 0) return "none";
        const valueStart = start + search.length;
        const end = json.indexOf("\"", valueStart);
        return json.slice(valueStart, end);
    }

    function extractNumber(json: string, key: string): number {
        const search = "\"" + key + "\":";
        const start = json.indexOf(search);
        if (start < 0) return 0;
        const valueStart = start + search.length;
        const end = json.indexOf("}", valueStart);
        return parseFloat(json.slice(valueStart, end));
    }

    export function getLabel(): string { return lastLabel; }
    export function getConfidence(): number { return lastConfidence; }
}