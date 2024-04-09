import { Stage } from "@pixi/react";
import { RoySprite } from "./RoySprite";
import useTamagotchi from "../app/StateContext";

export const PixiApp = () => {
    const { isHere, isAsleep } = useTamagotchi('base');

    const width = 250;
    const height = 250;
    const stageProps = {
        height,
        width,
        options: {
            backgroundAlpha: 0
        },
    };

    if (!isHere) {
        return (
            <div id="game_container" className="sprite">
            <Stage {...stageProps} />
        </div>
        )
    } else {
        return (
            <div id="game_container" className="sprite">
                <Stage {...stageProps}>
                    {!isAsleep && <RoySprite state='base'/>}
                    {isAsleep && <RoySprite state='sleep'/>}
                </Stage>
            </div>
        )
    }

    
}