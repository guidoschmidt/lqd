import { createSignal, For } from "solid-js";
import { createStore } from "solid-js/store";
import {
  TextInput,
  Potentiometer,
  NumberInput,
  Slider,
  ColorInput,
  Label,
  SliderOrientation,
  LabelOrientatian,
} from "../components";
import noisejs from "noisejs";
const noise = new noisejs["Noise"]();
// import random from "random";
// import seedrandom from "seedrandom";

export default {
  title: "Layout/Example",
  component: Potentiometer,
};

const randomHexColor = () => {
  let result = [];
  let hexRef = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  for (let n = 0; n < 6; n++) {
    result.push(hexRef[Math.floor(Math.random() * 16)]);
  }
  const color = "#" + result.join("");
  return "#" + result.join("");
};

export const PotentiometerStory = () => {
  const [t, setT] = createSignal(0);
  const [store, updateStore] = createStore({
    values: new Array(8).fill(0).map((_, i: number) => ({
      v: Math.round(Math.random() * 100),
      l: `Input ${i}`,
      f: (Math.random() - 0.5) * 3.0,
      c: {
        r: Math.round(Math.random() * 200),
        g: Math.round(Math.random() * 200),
        b: Math.round(Math.random() * 200),
      },
    })),
  });

  setInterval(() => {
    setT(t() + 1.0 / 60);
    store.values.forEach((v, i) => {
      updateStore(
        "values",
        i,
        "l",
        `${t() << (1 - 0.5)} + ƒ ${(v.f / 10.0).toFixed(2)}`
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
      updateStore(
        "values",
        i,
        "f",
        v.f + (noise.perlin2(t(), t()) + 1) * 0.0001
      );
      updateStore("values", i, "c", {
        r: Math.round(v.c.r + (noise.perlin2(t(), t()) + 1) * 54),
        g: Math.round(v.c.g + (noise.perlin2(t(), t()) + 1) * 54),
        b: Math.round(v.c.b + (noise.perlin2(t(), t()) + 1) * 54),
      });
    });
  }, 16);

  return (
    <div
      style={{
        width: "50vw",
        display: "grid",
        "grid-template-columns": "repeat(4, 20vw)",
      }}
    >
      <For each={store.values}>
        {(e, i) => (
          <div
            style={{
              display: "grid",
              "grid-template-columns": "20px 1fr",
            }}
          >
            <div
              class="color-preview"
              style={{
                width: "100%",
                height: "100%",
                background: `#${e.c.r.toString(16)}${e.c.g.toString(
                  16
                )}${e.c.b.toString(16)}`,
                opacity: `${e.v}%`,
              }}
            />
            <div
              style={{
                background: "black",
                display: "flex",
                width: "100%",
                "flex-direction": "column",
                "justify-content": "stretch",
                "align-items": "stretch",
              }}
            >
              <Label text="TIME">
                <code
                  style={{
                    color: "white",
                    "font-family": "monospace",
                    "font-size": "var(--font-size)",
                    padding: "10px",
                  }}
                >
                  {e.l}
                </code>
              </Label>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  "align-self": "stretch",
                  "justify-content": "stretch",
                }}
              >
                <Label text="CLR">
                  <ColorInput
                    color={`#${e.c.r.toString(16)}${e.c.g.toString(
                      16
                    )}${e.c.b.toString(16)}`}
                    onChange={(c) => {
                      updateStore("values", i(), "c", c);
                    }}
                  />
                </Label>
              </div>
              <TextInput
                value={e.l}
                onChange={(v: string) => {
                  updateStore("values", i(), "l", v);
                }}
              />
              <NumberInput
                value={e.v}
                onChange={(nv: number) => {
                  updateStore("values", i(), "v", Math.round(nv));
                }}
              />
              <Label text="PTTY">
                <Potentiometer
                  percent={e.v}
                  onChange={(nv: number) => {
                    updateStore("values", i(), "v", Math.round(nv));
                  }}
                />
              </Label>
              <Label text="SLDR" orientation={LabelOrientatian.COLUMN}>
                <Slider
                  orientation={SliderOrientation.Horizontal}
                  value={e.v}
                  onChange={(nv: number) => {
                    updateStore("values", i(), "v", Math.round(nv));
                  }}
                />
              </Label>
            </div>
          </div>
        )}
      </For>
    </div>
  );
};
PotentiometerStory.title = "Layout/Grid";
