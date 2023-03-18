import { Application, FederatedMouseEvent, FederatedWheelEvent, ICanvas } from 'pixi.js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ActionObject } from '../App';
import { getCircle, getRectangle } from './shapes';

export const Canvas = (props: ActionObject) => {
    const isPanning = useRef(false);
    const scale = useRef(1);
    const canvasRef = useRef<HTMLDivElement>(null);
    const pixiRef = useRef<Application<ICanvas>>();
    const coords = useRef({x: 0, y: 0});
    const stageLastPosition = useRef({x: 0, y: 0});

    useEffect(() => {
        switch(props.currentAction) {
            case 'circle':
                pixiRef.current?.stage.addChild(getCircle());
                break;
            case 'square':
                pixiRef.current?.stage.addChild(getRectangle());
                break;
            case 'clear':
                pixiRef.current?.stage.removeChildren();
                break;
            default:
                return;
        }
    }, [props.currentAction]);

    useEffect(() => {
        pixiRef.current = new Application({
            width: window.innerWidth - 3 * 16,
            height: window.innerHeight,
            backgroundColor: 'lightgray',
        });
        // @ts-ignore
        pixiRef.current.view.addEventListener('wheel', (event: FederatedWheelEvent) => {

            //@ts-ignore
            // const amount = event.wheelDelta > 0 ?  1.035 : 1 / 1.035;
            // scale.current = scale.current * amount;
            // pixiRef.current!.stage.scale.x = scale.current;
            // pixiRef.current!.stage.scale.y = scale.current;
            // console.log('wheel --->', event);
            // const newX = -(event.offsetX * scale.current) + event.x;
            // const newY = -(event.offsetY * scale.current) + event.y;

            // pixiRef.current!.stage.position.x = newX;
            // pixiRef.current!.stage.position.y = newY;
        });

        // @ts-ignore
        pixiRef.current.view.addEventListener!('mousedown', (event: FederatedMouseEvent) => {
            isPanning.current = true;
            coords.current = { x: event.x, y: event.y };
            console.log('click ---->', event);
            stageLastPosition.current = { x: pixiRef.current!.stage.position.x, y: pixiRef.current!.stage.position.y };
        });
        // @ts-ignore
        pixiRef.current.view.addEventListener!('mousemove', (event: FederatedMouseEvent) => {
            if(isPanning.current) {
                const { x, y } = stageLastPosition.current;
                pixiRef.current!.stage.position.x = x + (event.x - coords.current.x);
                pixiRef.current!.stage.position.y = y + (event.y - coords.current.y);
            }
        });
        // @ts-ignore
        pixiRef.current.view.addEventListener!('mouseup', (event: FederatedMouseEvent) => {
            isPanning.current = false;
        });

        canvasRef.current?.appendChild(pixiRef.current.view as any);
        pixiRef.current.start();

        return () => {
            pixiRef.current?.destroy(true, true);
        }
    }, []);

    return (
        <CanvasBody ref={canvasRef} />
    )
}


const CanvasBody = styled.div`
    width: calc(100vw - 3em);
    height: 100vh;
    background-color: lightgray;
`;