import { createSignal } from "solid-js";
import "./ColorInput.sass";

type ColorInputProps = {
  color: string;
  onChange?: (c: string) => void;
};

function ColorInput(props: ColorInputProps) {
  const [color, setColor] = createSignal(props.color || "#ffffff");
  const uuid = crypto.randomUUID();

  // @TODO
  // implement sideeffect signal to change on props.color

  const onChange = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    setColor(target.value);
    props.onChange && props.onChange(target.value);
  };

  return (
    <div
      class="color-input"
      style={{
        color: color(),
      }}
    >
      <label class="color-preview-wrapper" for={`color-${uuid}`}>
        <div
          class="color-preview"
          style={{
            "background-color": color(),
          }}
        />
      </label>
      <input
        class="input"
        type="color"
        id={`color-${uuid}`}
        value={color()}
        onInput={(e) => onChange(e)}
      />
    </div>
  );
}

export { ColorInput };
