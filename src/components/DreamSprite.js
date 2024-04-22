import { TilingSprite, AnimatedSprite, withFilters, Container } from "@pixi/react";
import { Assets, Spritesheet, WRAP_MODES, DisplacementFilter } from "pixi.js";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { useInterval } from "../hooks/useInterval";
import tornado from "../sprites/tornado.png"
import tornadoJson from "../sprites/tornado.json"
import hayate from "../sprites/hayate.png"
import hayateJson from "../sprites/hayate.json"
import displacementMap from "../sprites/displacement_map_repeat.jpg"

Assets.add({alias: "tornado", src: tornado})
const tornadoBaseTexture = await Assets.load("tornado")
const tornadoSpritesheet = new Spritesheet(tornadoBaseTexture, tornadoJson)
await tornadoSpritesheet.parse()

Assets.add({alias: "hayate", src: hayate})
const hayateBaseTexture = await Assets.load("hayate")
const hayateSpritesheet = new Spritesheet(hayateBaseTexture, hayateJson)
await hayateSpritesheet.parse()

Assets.add({alias: "filter", src: displacementMap})
const filterTexture = await Assets.load("filter")

const config = {
    displacement: {
        x: 1,
        y: 1
    }
};

const Filters = withFilters(Container, {
    displacement: DisplacementFilter
});

export const DreamSprite = (props) => {
    const willMount = useRef(true);
    const [textures, setTextures] = useState([]);
    const displacementSpriteRef = useRef();
    const [renderFilter, setRenderFilter] = useState(false);
    const [displacementConfig, setDisplacementConfig] = useState(
        config.displacement
    );

    useInterval(() => {
        setDisplacementConfig({x: displacementConfig.x + 2, y: 1})
    }, 50)

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

    

    useEffect(() => {
        if (displacementSpriteRef.current.baseTexture !== null) {
            displacementSpriteRef.current.texture.baseTexture.wrapMode = WRAP_MODES.REPEAT;
            setRenderFilter(true);
        }
    }, [])
    
    return (
        <>
            <TilingSprite
                {...displacementConfig}
                texture={filterTexture}
                ref={displacementSpriteRef}
            />
            {renderFilter && (
                <Filters
                displacement={{
                    construct: [displacementSpriteRef.current],
                    scale: { x: 30, y: 60 }
                }}
                >
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
                </Filters>
            )}
        </>
    )
}