import { createSignal, createEffect } from "solid-js";
import "./RadioButton.sass";

interface IRadioButtonProps {
  on: boolean;
  onChange?: (on: boolean) => any;
}

function RadioButton(props: IRadioButtonProps) {
  const [isOn, setOn] = createSignal(props.on);

  createEffect(() => setOn(props.on));

  const handleClick = () => {
    const newValue = !isOn();
    setOn(newValue);
    props.onChange && props.onChange(newValue);
  };

  return (
    <div class="radio-button" onClick={handleClick}>
      <div classList={{ state: true, on: isOn() }} />
    </div>
  );
}

export { RadioButton };
