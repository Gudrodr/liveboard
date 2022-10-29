import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ActionObject } from '../App';

export const Canvas = (props: ActionObject) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const draw = (figure: 'square' | 'circle') => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;
        context.beginPath();
        if (figure === 'circle') {
            context.arc(100, 75, 50, 0, 2 * Math.PI);
        } else {
            context.rect(20, 20, 150, 100);
        }
        context.stroke();
    }

    const clear = () => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) return;
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    useEffect(() => {
        switch(props.currentAction) {
            case 'circle':
                draw(props.currentAction);
                break;
            case 'square':
                draw(props.currentAction);
                break;
            case 'clear':
                clear();
                break;
            default: return;
        }
    }, [props.currentAction]);

    return (
        <CanvasBody>
            <canvas style={{ width: '700px' }} ref={canvasRef} />
        </CanvasBody>
    )
}


const CanvasBody = styled.div`
    width: calc(100vw - 3em);
    height: 100vh;
    background-color: lightgray;
`;