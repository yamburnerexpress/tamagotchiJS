import { AnimatedSprite, Stage } from "@pixi/react";
import { Assets, Spritesheet } from "pixi.js";
import React, { useState, useRef } from "react";
import roy from "../sprites/roy_base_enlarged.png"
import royJson from "../sprites/roy_base_enlarged.json"
import useTamagotchi from "../app/StateContext";

Assets.add({alias: "roy_base", src: roy})

const baseTexture = await Assets.load("roy_base")
const spritesheet = new Spritesheet(baseTexture, royJson)
await spritesheet.parse()

export const RoySprite = () => {
    const { isHere } = useTamagotchi();
    const width = 250;
    const height = 250;
    const stageProps = {
        height,
        width,
        options: {
            backgroundAlpha: 0
        },
    };

    const willMount = useRef(true);
    const [textures, setTextures] = useState([]);

    const loadSpritesheet = () => {
        setTextures(Object.keys(spritesheet.textures).map((k) => spritesheet.textures[k]))
    }

    if (willMount.current) {
        loadSpritesheet();
        willMount.current = false;
    }

    console.log(textures)
    
    return (
        <Stage {...stageProps}>
            {isHere && <AnimatedSprite
                anchor={.5}
                textures={textures}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.1}
                x={100}
                y={150}
            />}
        </Stage>
    )
}