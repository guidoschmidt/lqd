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
    setOn(!isOn());
    props.onChange && props.onChange(!isOn());
  };

  return (
    <div class="radio-button" onClick={handleClick}>
      <div classList={{ state: true, on: isOn() }} />
    </div>
  );
}

export { RadioButton };
