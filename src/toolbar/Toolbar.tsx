import { useCallback } from 'react';
import styled from 'styled-components';
import { ActionObject } from '../App';

interface Props {
    updateAction: (action: ActionObject) => void;
}

export const Toolbar = (props: Props) => {
    const { updateAction } = props;

    const createCircleSticker = useCallback(() => updateAction({ currentAction: 'circle' }), [updateAction]);

    const createSquareSticker = useCallback(() => updateAction({ currentAction: 'square' }), [updateAction]);

    const clearCanvas = useCallback(() => updateAction({ currentAction: 'clear' }), [updateAction]);
    
    return (
        <ToolbarBody>
            <CircleSticker onClick={createCircleSticker} />
            <SquareSticker onClick={createSquareSticker} />
            <DeleteButton onClick={clearCanvas} />
        </ToolbarBody>
    )
}


const ToolbarBody = styled.div`
    width: 3em;
    height: 100vh;
    padding: .2em;
    background-color: lightyellow;
`;

const StickerBody = styled.div`
    width: 2.6em;
    height: 2.6em;
    background-color: white;
    border: 1px solid darkgray;
    cursor: pointer;
    margin-bottom: 2em;
`;

const CircleSticker = styled(StickerBody)`
    border-radius: 50%;
`;

const SquareSticker = styled(StickerBody)`
    border-radius: .2em;
`;

const DeleteButton = styled(StickerBody)`
    :before, :after {
        position: absolute;
        left: 1.4em;
        content: ' ';
        height: 2.6em;
        width: 2px;
        background-color: #333;
    }
    :before {
        transform: rotate(45deg);
    }
    :after {
        transform: rotate(-45deg);
    }
`;
