import { For, Switch, Match, mergeProps, onCleanup } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
// Components
import { NumericalInput, ColorInput, RadioButton } from "../lib";
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

          // return (
          //   <div>
          //     <b>{key}</b> <span>{uiType}</span>
          //   </div>
          // );

          return (
            <Switch fallback={<div>{component}</div>}>
              <Match when={component == "number"}>
                <label>{component}</label>
                <label>{label}</label>
                <NumericalInput
                  value={(mergedProps.store as any)[key]}
                  onChange={updateFn}
                  step={step}
                  min={minMax?.min}
                  max={minMax?.max}
                />
              </Match>

              <Match when={component == "boolean"}>
                <label>{component}</label>
                <label>{label}</label>
                <RadioButton
                  on={(mergedProps.store as any)[key]}
                  onChange={updateFn}
                />
              </Match>

              <Match when={component == "Color"}>
                <label>{component}</label>
                <label>{label}</label>
                <ColorInput
                  color={(mergedProps.store as any)[key]}
                  onChange={updateFn}
                />
              </Match>
            </Switch>
          );
        }}
      </For>
    </div>
  );
}

export { UiGenerator };
