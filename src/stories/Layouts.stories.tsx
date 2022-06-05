import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import {
  TextInput,
  Potentiometer,
  NumericalInput,
  Slider,
  ColorInput,
} from "../components";
import noisejs from "noisejs";
const noise = new noisejs["Noise"]();
// import random from "random";
// import seedrandom from "seedrandom";

export default {
  title: "Layout/Example",
  component: Potentiometer,
};

export const PotentiometerStory = () => {
  const [t, setT] = createSignal(0);
  const [store, updateStore] = createStore({
    values: new Array(8).fill(0).map((_, i: number) => ({
      v: Math.round(Math.random() * 100),
      l: `Input ${i}`,
      f: (Math.random() - 0.5) * 3.0,
      c: `#ffffff`,
    })),
  });

  setInterval(() => {
    setT(t() + 1.0 / 60);
    store.values.forEach((v, i) => {
      updateStore(
        "values",
        i,
        "l",
        `Time ${t() << (1 - 0.5)} + ƒ ${(v.f / 10.0).toFixed(2)}`
      );
      updateStore(
        "values",
        i,
        "v",
        ((noise.perlin2(t() * v.f, t() * v.f) + 1) * 0.5 * 100.0) << (1 - 0.5)
      );
      updateStore(
        "values",
        i,
        "f",
        v.f + (noise.perlin2(t(), t()) + 1) * 0.0001
      );
    });
  }, 16);

  return (
    <div
      style={{
        width: "fit-content",
        display: "grid",
        "grid-template-columns": "repeat(4, 1fr)",
      }}
    >
      <For each={store.values}>
        {(e, i) => (
          <div
            style={{
              background: "black",
              display: "flex",
              "flex-direction": "column",
              "justify-content": "stretch",
              "align-items": "stretch",
            }}
          >
            <code
              style={{
                color: "white",
                "font-family": "monospace",
                padding: "10px",
              }}
            >
              {e.l}
            </code>
            <div
              style={{
                display: "flex",
                "align-self": "stretch",
                "justify-content": "stretch",
              }}
            >
              <ColorInput
                color={e.c}
                onChange={(c) => {
                  updateStore("values", i(), "c", c);
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: e.c,
                  opacity: `${e.v}%`,
                }}
              />
            </div>
            <TextInput
              value={e.l}
              onChange={(v: string) => {
                updateStore("values", i(), "l", v);
              }}
            />
            <NumericalInput
              value={e.v}
              onChange={(nv: number) => {
                updateStore("values", i(), "v", Math.round(nv));
              }}
            />
            <Potentiometer
              percent={e.v}
              onChange={(nv: number) => {
                updateStore("values", i(), "v", Math.round(nv));
              }}
            />
            <Slider
              value={e.v}
              onChange={(nv: number) => {
                updateStore("values", i(), "v", Math.round(nv));
              }}
            />
          </div>
        )}
      </For>
    </div>
  );
};
PotentiometerStory.title = "Layout/Grid";
