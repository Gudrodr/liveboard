import { Graphics } from "pixi.js";
import { Shape } from "./Canvas";

const defaultBackgroundColor = 0xffffff;
const selectedBackgroundColor = 0xFFA3A3A3;

export const getCircle = (id: string) => {
    let coords = { x: 150, y: 150 };
    const outline: Shape = new Graphics();
    outline.lineStyle(1, selectedBackgroundColor);
    outline.drawCircle(coords.x, coords.y, 30);
    const circle: Shape = new Graphics();
    circle.id = id;
    circle.beginFill(defaultBackgroundColor);
    circle.drawCircle(coords.x, coords.y, 30);
    circle.endFill();
    circle.interactive = true;

    let isDragging = false;
    let isSelected = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };

    circle.interactive = true;
    circle.on('mousedown', (event) => {
        isDragging = true;
        dragStart = event.global.clone();
    });
    // @ts-ignore
    circle.on('select', () => {
        isSelected = true;
        circle.addChild(outline);
    })
    // @ts-ignore
    circle.on('unselect', () => {
        isSelected = false;
        circle.removeChildren();
    })

    circle.on('mousemove', (event) => {
        if (isDragging) {
            dragEnd = event.global.clone();
            const dragDelta = { x: dragEnd.x - dragStart.x, y: dragEnd.y - dragStart.y };
            circle.x += dragDelta.x;
            circle.y += dragDelta.y;
            coords.x += dragDelta.x;
            coords.y += dragDelta.y;
            dragStart = dragEnd;
        }
    });

    circle.on('mouseup', () => {
        isDragging = false;
    });
    circle.on('mouseupoutside', () => {
        isDragging = false;
    });
    return circle;
}

export const getRectangle = (id: string) => {
    let coords = { x: 500, y: 400 };
    const square: Shape = new Graphics();
    const outline: Shape = new Graphics();
    outline.lineStyle(1, selectedBackgroundColor);
    outline.drawRect(coords.x, coords.y, 60, 60);
    square.id = id;
    square.beginFill(defaultBackgroundColor);
    square.drawRect(coords.x, coords.y, 60, 60);
    square.endFill();
    square.interactive = true;

    let isDragging = false;
    let isSelected = false;
    let dragStart = { x: 0, y: 0 };
    let dragEnd = { x: 0, y: 0 };

    square.interactive = true;
    // @ts-ignore
    square.on('select', () => {
        isSelected = true;
        square.addChild(outline);
    })
    // @ts-ignore
    square.on('unselect', () => {
        isSelected = false;
        square.removeChildren();
    })
    square.on('mousedown', (event) => {
        isDragging = true;
        dragStart = event.global.clone();
    });

    square.on('mousemove', (event) => {
        if (isDragging) {
            dragEnd = event.global.clone();
            const dragDelta = { x: dragEnd.x - dragStart.x, y: dragEnd.y - dragStart.y };
            square.x += dragDelta.x;
            square.y += dragDelta.y;
            dragStart = dragEnd;
        }
    });

    square.on('mouseup', () => {
        isDragging = false;
    });
    square.on('mouseupoutside', () => {
        isDragging = false;
    });
    return square;
}