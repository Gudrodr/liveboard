import { Graphics } from "pixi.js";

export const getCircle = () => {
    const gr = new Graphics();
    gr.beginFill(0xffffff);
    gr.drawCircle(150, 150, 30);
    gr.endFill();
    return gr;
}

export const getRectangle = () => {
    const gr = new Graphics();
    gr.beginFill(0xffffff);
    gr.drawRect(500, 400, 60, 60);
    gr.endFill();
    return gr;
}