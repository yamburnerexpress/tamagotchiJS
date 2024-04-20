import { AnimatedSprite } from "@pixi/react";
import { Assets, Spritesheet } from "pixi.js";
import React, { useState, useRef, useMemo } from "react";
import tornado from "../sprites/tornado.png"
import tornadoJson from "../sprites/tornado.json"
import hayate from "../sprites/hayate.png"
import hayateJson from "../sprites/hayate.json"

Assets.add({alias: "tornado", src: tornado})
const tornadoBaseTexture = await Assets.load("tornado")
const tornadoSpritesheet = new Spritesheet(tornadoBaseTexture, tornadoJson)
await tornadoSpritesheet.parse()

Assets.add({alias: "hayate", src: hayate})
const hayateBaseTexture = await Assets.load("hayate")
const hayateSpritesheet = new Spritesheet(hayateBaseTexture, hayateJson)
await hayateSpritesheet.parse()

export const DreamSprite = (props) => {

    const willMount = useRef(true);
    const [textures, setTextures] = useState([]);

    const spritesheet = useMemo(() => {
        if (props.dream === "tornado") {
            return tornadoSpritesheet
        } else if (props.dream === "hayate") {
            return hayateSpritesheet
        }
    }, [props])

    const loadSpritesheet = () => {
        let data = spritesheet.data.meta.frameTags.find(frame => frame.name === props.state)
        setTextures(Object.keys(spritesheet.textures).slice(data.from, data.to + 1).map((k) => spritesheet.textures[k]))
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