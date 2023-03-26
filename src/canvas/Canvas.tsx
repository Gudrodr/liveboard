import { Application, DisplayObject, EventBoundary, FederatedMouseEvent, FederatedPointerEvent, FederatedWheelEvent, Graphics, ICanvas } from 'pixi.js';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { ActionObject } from '../App';
import { getCircle, getRectangle } from './shapes';

export type Shape = Graphics & { id?: string };
type DisplayObjectWithId = DisplayObject & { id?: string }

export const Canvas = (props: ActionObject) => {
    const isPanning = useRef(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const pixiRef = useRef<Application<ICanvas>>();
    const coords = useRef({ x: 0, y: 0 });
    const stageLastPosition = useRef({ x: 0, y: 0 });
    const selectedShape = useRef<DisplayObjectWithId | undefined>(undefined);

    useEffect(() => {
        switch (props.currentAction) {
            case 'circle':
                pixiRef.current?.stage.addChild(getCircle(v4()));
                break;
            case 'square':
                pixiRef.current?.stage.addChild(getRectangle(v4()));
                break;
            case 'clear':
                if (selectedShape.current) {
                    pixiRef.current?.stage.removeChild(selectedShape.current);
                    selectedShape.current = undefined;
                } else {
                    pixiRef.current?.stage.removeChildren();
                }
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
        const boundary = new EventBoundary(pixiRef.current?.stage);
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
        pixiRef.current.view.addEventListener!('mousedown', (event: FederatedPointerEvent) => {
            const graphics: Shape | null = boundary.hitTest(event.offsetX, event.offsetY) as Shape;
            if (!graphics) {
                if (selectedShape.current) {
                    //@ts-ignore
                    pixiRef.current?.stage.children.find(item => item.id === selectedShape.current?.id).emit('unselect');
                    selectedShape.current = undefined;
                }
                const { position } = pixiRef.current!.stage;
                isPanning.current = true;
                coords.current = { x: event.x, y: event.y };
                stageLastPosition.current = { x: position.x, y: position.y };
            } else {
                //@ts-ignore
                graphics.emit('select');
                if (selectedShape.current && graphics.id !== selectedShape.current.id) {
                    //@ts-ignore
                    pixiRef.current?.stage.children.find(item => item.id === selectedShape.current?.id).emit('unselect');
                }
                selectedShape.current = graphics;
            }
        });
        // @ts-ignore
        pixiRef.current.view.addEventListener!('mousemove', (event: FederatedMouseEvent) => {
            if (isPanning.current) {
                const { x, y } = stageLastPosition.current;
                console.log(x, y)
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