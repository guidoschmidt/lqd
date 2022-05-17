import { For } from "solid-js";
import { createStore } from "solid-js/store";
import { Potentiometer, NumericalInput, Slider } from "../components";

export default {
  title: "Layout/Example",
  component: Potentiometer,
};

export const PotentiometerStory = () => {
  const [store, updateStore] = createStore({
    values: new Array(8)
      .fill(0)
      .map((_) => ({ v: Math.round(Math.random() * 100) })),
  });

  // setInterval(() => {
  //   updateStore("values", (l) =>
  //     l.map(() => ({ v: Math.round(Math.random() * 100) }))
  //   );
  // }, 100);

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
            <div
              style={{
                display: "flex",
                "align-self": "center",
                "justify-content": "center",
                "align-items": "center",
                width: "100%",
                height: "50px",
                background: "var(--color-fg)",
                opacity: `${e.v}%`,
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
