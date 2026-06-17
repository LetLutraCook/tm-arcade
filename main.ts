namespace teachable {
    tmnet.init();

    //% block="on label %name detected"
    export function onLabel(name: string, handler: () => void) {
        let fired = false;
        game.onUpdate(() => {
            if (tmnet.getLabel() == name) {
                if (!fired) {
                    handler();
                    fired = true;
                }
            } else {
                fired = false;
            }
        });
    }

    //% block="current label"
    export function label(): string { return tmnet.getLabel(); }
    
    //% block="show debug overlay"
    export function showDebug() {
        game.onUpdate(() => {
            screen.print("Label: " + tmnet.getLabel(), 0, 0);
        });
    }
}