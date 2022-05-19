import { createSignal, createEffect } from "solid-js";
import "./TextInput.sass";

interface TextInputProps {
  value: string;
  onChange: (v: string) => void;
}

function TextInput(props: TextInputProps) {
  const [value, setValue] = createSignal<string>(props.value);

  createEffect(() => setValue(props.value));

  const handleChange = (v: string) => {
    setValue(v);
    props.onChange && props.onChange(v);
  };

  return (
    <div class="text-input">
      <input
        type="text"
        value={value()}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          handleChange(target.value);
        }}
      />
    </div>
  );
}

export { TextInput };
