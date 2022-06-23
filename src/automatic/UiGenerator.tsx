import { For, Switch, Match, mergeProps } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
// Components
import { NumericalInput } from "../lib";
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
          const uiType = store[`__${key}Type`] || typeof store[key];
          const label = store[`__${key}Label`] || key;
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
            <Switch>
              <Match when={uiType == "number"}>
                <NumericalInput
                  value={(mergedProps.store as any)[key]}
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
