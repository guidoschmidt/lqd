import { createSignal } from "solid-js";
import "./NumericalInput.sass";

interface INumericalInputProps {
  value: number;
  onChange: Function;
}

function NumericalInput(props: INumericalInputProps) {
  const [value, setValue] = createSignal(props.value);

  const handleChange = (v: number) => {
    setValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <div class="numerical-input">
      <button class="button" onClick={() => handleChange(value() - 1)}>
        -
      </button>
      <input
        class="input"
        type="number"
        value={value()}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          handleChange(parseInt(target.value));
        }}
      />
      <button class="button" onClick={() => handleChange(value() + 1)}>
        +
      </button>
    </div>
  );
}

export { NumericalInput };
