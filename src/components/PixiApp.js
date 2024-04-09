import { Stage } from "@pixi/react";
import { RoySprite } from "./RoySprite";
import useTamagotchi from "../app/StateContext";

export const PixiApp = () => {
    const { spriteState } = useTamagotchi();

    const width = 250;
    const height = 250;
    const stageProps = {
        height,
        width,
        options: {
            backgroundAlpha: 0
        },
    };

    if (spriteState === "away") {
        return (
            <div id="game_container" className="sprite">
                <Stage {...stageProps} />
            </div>
        )
    } else {
        return (
            <div id="game_container" className="sprite">
                <Stage {...stageProps}>
                    <RoySprite key={spriteState} state={spriteState}/>
                </Stage>
            </div>
        )
    }
}