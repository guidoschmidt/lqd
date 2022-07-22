import { createSignal } from "solid-js";
import { For, Show } from "solid-js/web";
import "scss.ui.toolkit/6-components/_select.scss";

interface ISelectProps {
  options: Array<T>;
  onSelect?: (v: T, i?: number) => void;
  formatOption?: (o: T, i?: number) => JSX.Element;
}

function Select(props: ISelectProps) {
  const [selected, setSelected] = createSignal(props.options[0]);
  const [isOpen, setIsOpen] = createSignal(false);
  const [options] = createSignal(props.options);

  const onSelectOption = (option: any, index: number) => {
    setSelected(option);
    setIsOpen(false);
    props.onSelect && props.onSelect(option, index());
  };

  return (
    <div class="select">
      <div class="selected" onClick={() => setIsOpen(!isOpen())}>
        {props.formatOption ? props.formatOption(selected()) : selected()}
      </div>
      <Show when={isOpen()}>
        <div class="options">
          <For each={options()} fallback={<></>}>
            {(option, index) => {
              return (
                <div
                  class="option"
                  onClick={() => onSelectOption(option, index)}
                >
                  {props.formatOption
                    ? props.formatOption(option, index)
                    : option}
                </div>
              );
            }}
          </For>
        </div>
      </Show>
    </div>
  );
}

export { Select };
