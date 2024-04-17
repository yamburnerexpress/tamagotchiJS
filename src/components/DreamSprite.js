import { AnimatedSprite } from "@pixi/react";
import { Assets, Spritesheet } from "pixi.js";
import React, { useState, useRef } from "react";
import tornado from "../sprites/tornado.png"
import tornadoJson from "../sprites/tornado.json"

Assets.add({alias: "tornado", src: tornado})

const baseTexture = await Assets.load("tornado")
const spritesheet = new Spritesheet(baseTexture, tornadoJson)
await spritesheet.parse()

export const DreamSprite = (props) => {

    const willMount = useRef(true);
    const [textures, setTextures] = useState([]);

    const loadSpritesheet = () => {
        let data = spritesheet.data.meta.frameTags.find(frame => frame.name === props.state)
        setTextures(Object.keys(spritesheet.textures).slice(data.from, data.to).map((k) => spritesheet.textures[k]))
    }

    if (willMount.current) {
        loadSpritesheet();
        willMount.current = false;
    }
    
    return (
        <AnimatedSprite
            anchor={.5}
            loop={true}
            textures={textures}
            isPlaying={true}
            initialFrame={0}
            animationSpeed={0.15}
            x={100}
            y={150}
        />
    )
}