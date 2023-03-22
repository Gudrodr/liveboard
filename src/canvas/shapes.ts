import { Graphics } from "pixi.js";

export const getCircle = (cb: (value: boolean) => void) => {
    const gr = new Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(150, 150, 30);
    gr.endFill();
    gr.interactive = true;

    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };

    gr.interactive = true;
    gr.on('mousedown', (event) => {
        console.log(event);
        gr.lineStyle(2, 0xFF0000);
        isDragging = true;
        dragStart = event.global.clone();
        cb(isDragging);
    });

    gr.on('mousemove', (event) => {
        if (isDragging) {
            dragEnd = event.global.clone();
            const dragDelta = { x: dragEnd.x - dragStart.x, y: dragEnd.y - dragStart.y };
            gr.x += dragDelta.x;
            gr.y += dragDelta.y;
            dragStart = dragEnd;
        }
    });

    gr.on('mouseup', () => {
        isDragging = false;
        cb(isDragging);
    });
    gr.on('mouseupoutside', () => {
        isDragging = false;
        cb(isDragging);
    });
    return gr;
}

export const getRectangle = (cb: (value: boolean) => void) => {
    const gr = new Graphics();
    gr.beginFill(0xffffff);
    gr.drawRect(500, 400, 60, 60);
    gr.endFill();
    gr.interactive = true;

    let isDragging = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };

    gr.interactive = true;
    gr.on('mousedown', (event) => {
        isDragging = true;
        dragStart = event.global.clone();
        cb(isDragging);
    });

    gr.on('mousemove', (event) => {
        if (isDragging) {
            dragEnd = event.global.clone();
            const dragDelta = { x: dragEnd.x - dragStart.x, y: dragEnd.y - dragStart.y };
            gr.x += dragDelta.x;
            gr.y += dragDelta.y;
            dragStart = dragEnd;
        }
    });

    gr.on('mouseup', () => {
        isDragging = false;
        cb(isDragging);
    });
    gr.on('mouseupoutside', () => {
        isDragging = false;
        cb(isDragging);
    });
    return gr;
}