import { AnimatedSprite, Sprite } from "@pixi/react";
import { Assets, Spritesheet } from "pixi.js";
import React, { useState, useRef } from "react";
import roy from "../sprites/roy_enlarged.png"
import royJson from "../sprites/roy_enlarged.json"

Assets.add({alias: "roy_base", src: roy})

const baseTexture = await Assets.load("roy_base")
const spritesheet = new Spritesheet(baseTexture, royJson)
await spritesheet.parse()

export const RoySprite = (props) => {

    const willMount = useRef(true);
    const [textures, setTextures] = useState([]);

    const loadSpritesheet = () => {
        let data = spritesheet.data.meta.frameTags.find(frame => frame.name === props.state)
        const textureArray = Object.keys(spritesheet.textures).slice(data.from, data.to).map((k) => spritesheet.textures[k])
        if (data.direction === 'reverse') {
            setTextures(textureArray.reverse())
        } else {
            setTextures(textureArray)
        }
    }

    if (willMount.current) {
        loadSpritesheet();
        willMount.current = false;
    }

    const dreamTexture = spritesheet.textures["roy_dreamcloud_0"];

    const opts = ['ROCK', 'PAPER', 'SCISSORS', 'dreamintro', 'dreamoutro'];

    const doesLoop = (
        opts.includes(props.state) ? false : true
    )
    
    return (
        <>
            <AnimatedSprite
                anchor={.5}
                loop={doesLoop}
                textures={textures}
                isPlaying={true}
                initialFrame={0}
                animationSpeed={0.15}
                x={100}
                y={150}
            />
            {props.dream && props.state === 'sleep' && <Sprite 
                anchor={.5}
                texture={dreamTexture}
                x={100}
                y={150}
            />}
        </>
    )
}