import { createSignal, createEffect } from "solid-js";
import "scss.ui.toolkit/6-components/_toggle.scss";

interface IToggleProps {
  on: boolean;
  onChange?: (on: boolean) => any;
}

function Toggle(props: IToggleProps) {
  const [isOn, setOn] = createSignal(props.on);

  createEffect(() => setOn(props.on));

  const handleClick = () => {
    const newValue = !isOn();
    setOn(newValue);
    props.onChange && props.onChange(newValue);
  };

  return (
    <div class="toggle" onClick={handleClick}>
      <div classList={{ state: true, on: isOn() }} />
    </div>
  );
}

export { Toggle };
