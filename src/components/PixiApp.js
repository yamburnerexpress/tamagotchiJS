// import { Stage, Sprite, Container } from "@pixi/react";
// import { useEffect } from "react";
// import { render } from "react-dom";
import { RoySprite } from "./RoySprite";

export const PixiApp = () => {
    // const width = 250;
    // const height = 250;
    // const stageProps = {
    //     height,
    //     width,
    //     options: {
    //         backgroundAlpha: 0
    //     },
    // };

    return (
        <div id="game_container" className="sprite">
            <RoySprite />
            {/* <Stage {...stageProps}>
                <Container x={width} y={height}>
                    <Roy />
                    <Sprite 
                        image={roy} 
                        anchor={{
                            x: 1,
                            y: 1,
                        }}
                    />
                </Container>
            </Stage> */}
        </div>
    )
}

// render(<PixiApp />, document.getElementById('game_container'))