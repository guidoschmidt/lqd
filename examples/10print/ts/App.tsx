import { createStore } from "solid-js/store";
// import { UiElement } from "doug.ui";
import random from "random";
import * as seedrandom from "seedrandom";
import { Settings } from "./Settings";
import "../style/App.scss";
import { onMount, onCleanup } from "solid-js";

const rng = random.clone(seedrandom("0"));

function App() {
  const [settings, updateSettings] = createStore(new Settings());

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const render = () => {
    const { width, height } = canvas;
    const size = width <= height ? height : width;
    const {
      tileCount,
      backgroundColor,
      foregroundColor,
      lineWidth,
      balance,
      invert,
    } = settings;

    const tiles = Array(tileCount)
      .fill(0)
      .map((_, i) => {
        return Array(tileCount)
          .fill(0)
          .map((_, j) => {
            const [width, height] = [size / tileCount, size / tileCount];
            const randomNumber = rng.float();
            if (randomNumber > balance) {
              return {
                x: i * width,
                y: j * height,
                toX: i * width + width,
                toY: j * height + height,
              };
            } else {
              return {
                x: i * width,
                y: j * height + height,
                toX: i * width + width,
                toY: j * height,
              };
            }
          });
      });

    const { h: bh, s: bs, v: bv } = invert ? foregroundColor : backgroundColor;
    ctx.fillStyle = `hsl(${bh}, ${bs}%, ${bv}%)`;
    ctx.fillRect(0, 0, width, height);

    const { h: fh, s: fs, v: fv } = invert ? backgroundColor : foregroundColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = `hsl(${fh}, ${fs}%, ${fv}%)`;

    tiles.map((row) => {
      row.map((rect) => {
        ctx.beginPath();
        ctx.moveTo(rect.x, rect.y);
        ctx.lineTo(rect.toX, rect.toY);
        ctx.stroke();
      });
    });
  };

  const onResize = () => {
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;
    render();
  };

  onMount(() => {
    ctx = canvas.getContext("2d");
    render();
    window.addEventListener("resize", onResize);
  });

  onCleanup(() => {
    window.removeEventListener("resize", onResize);
  });

  return (
    <div
      style={{
        margin: "40px",
      }}
    >
      {/*<UiElement
       store={settings}
       updateStore={updateSettings}
       class="ui"
       onChange={render}
        />*/}
      <canvas
        width={window.innerWidth - 100}
        height={window.innerHeight - 100}
        ref={canvas}
      />
    </div>
  );
}

export { App };