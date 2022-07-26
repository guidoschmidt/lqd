import { For, Switch, Match, mergeProps, onCleanup } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { LabelOrientatian, SliderOrientation } from "../components";
// Components
import { NumberInput, ColorInput, Toggle, Label, Slider } from "../lib";
// Style
import "./UiGenerator.sass";

interface IUiGeneratorProps {
  class?: string;
  label?: string;
  path?: string[];
  store: object;
  updateStore?: SetStoreFunction<any>;
  onChange?: (k: string, v: any) => any;
}

function UiGenerator(props: IUiGeneratorProps) {
  const mergedProps = mergeProps(
    {
      path: [],
      store: {},
      updateStore: () => {},
      label: props.label || (props?.path !== undefined ? props.path[0] : "UI"),
    },
    props
  );

  return (
    <div class={["ui-root", props.class].join(" ")}>
      <For
        each={Object.keys(mergedProps.store).filter(
          (key: string) => !key.includes("__")
        )}
      >
        {(key: string) => {
          const store = mergedProps.store as any;
          const component =
            store[`__lqd__${key}__Component`] || typeof store[key];
          const label = store[`__lqd__${key}__Label`] || key;
          const step = store[`__lqd__${key}__Step`];
          const minMax: { min: number; max: number } =
            store[`__lqd__${key}__MinMax`];
          const updateFn = (v: any) => {
            const update: { [key: string]: any } = {};
            update[key] = v;
            console.group(`Update ${key}`);
            console.dir(mergedProps.path, key);
            console.dir(update);
            console.groupEnd();
            if (mergedProps.path.length >= 1) {
              mergedProps.updateStore(mergedProps.path, (s: any) => ({
                ...s,
                ...update,
              }));
            } else {
              mergedProps.updateStore(key, v);
            }
            props.onChange && props.onChange(key, v);
          };

          return (
            <Switch fallback={<div>{component}</div>}>
              <Match when={component == "number"}>
                <Label
                  text={label}
                  orientation={LabelOrientatian.COLUMN}
                  style={{ "grid-column": "span 2" }}
                >
                  <NumberInput
                    value={(mergedProps.store as any)[key]}
                    onChange={updateFn}
                    step={step}
                    min={minMax?.min}
                    max={minMax?.max}
                  />
                </Label>
              </Match>

              <Match when={component == "boolean"}>
                <Label text={label}>
                  <Toggle
                    on={(mergedProps.store as any)[key]}
                    onChange={updateFn}
                  />
                </Label>
              </Match>

              <Match when={component == "Color"}>
                <Label text={label} orientation={LabelOrientatian.COLUMN}>
                  <ColorInput
                    color={(mergedProps.store as any)[key]}
                    onChange={updateFn}
                  />
                </Label>
              </Match>

              <Match when={component == "Slider"}>
                <Label
                  text={label}
                  orientation={LabelOrientatian.COLUMN}
                  style={{ "grid-column": "span 2" }}
                >
                  <Slider
                    value={(mergedProps.store as any)[key]}
                    onChange={updateFn}
                    orientation={SliderOrientation.Horizontal}
                    step={step}
                  />
                </Label>
              </Match>
            </Switch>
          );
        }}
      </For>
    </div>
  );
}

export { UiGenerator };
