namespace teachable {

    tmnet.init();

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
        let lastSeen = "";
        game.onUpdateInterval(200, () => {
            const current = tmnet.getLabel();
            if (current == name && lastSeen != name) {
                handler();
            }
            lastSeen = current;
        });
    }
}