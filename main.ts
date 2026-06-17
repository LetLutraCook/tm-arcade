namespace teachable {

    //% block="connect to AI server $url"
    export function connect(url: string) {
        tmnet.connect(url);
    }

    //% block="current label"
    export function label(): string {
        return tmnet.getLabel();
    }

    //% block="confidence"
    export function confidence(): number {
        return tmnet.getConfidence();
    }

    //% block="on label $name received"
    export function onLabel(name: string, handler: () => void) {
        game.onUpdateInterval(100, () => {
            if (tmnet.getLabel() == name) {
                handler();
            }
        });
    }
}