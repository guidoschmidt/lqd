import { createSignal, createEffect } from "solid-js";
import "scss.ui.toolkit/6-components/_number.scss";

interface INumberInputProps {
  value: number;
  onChange: Function;
  min?: number;
  max?: number;
  step?: number;
}

function NumberInput(props: INumberInputProps) {
  const [value, setValue] = createSignal(props.value);

  createEffect(() => setValue(props.value));

  // @TODO clamp value based on min/max

  const handleChange = (v: number) => {
    setValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <div class="number input-row">
      <button
        class="button"
        onClick={() => handleChange(value() - (props?.step || 1))}
      >
        -
      </button>
      <input
        class="input"
        type="number"
        step={props.step}
        min={props.min}
        max={props.max}
        value={value()}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleChange(parseInt(target.value));
        }}
      />
      <button
        class="button"
        onClick={() => handleChange(value() + (props?.step || 1))}
      >
        +
      </button>
    </div>
  );
}

export { NumberInput };
