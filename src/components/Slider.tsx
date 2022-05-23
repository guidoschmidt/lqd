import { createSignal, createEffect } from "solid-js";
import "./Slider.sass";

interface ISliderProps {
  value: number;
  onChange: (v: number) => any;
}

function Slider(props: ISliderProps) {
  const [value, setValue] = createSignal(props.value);
  const [pointerDown, setPointerDown] = createSignal(false);

  let trackRef: HTMLDivElement;

  createEffect(() => setValue(props.value));

  const onChange = (e: PointerEvent | MouseEvent) => {
    /** Horizontal */
    const mouseX = e.clientX;
    const target = e.target as HTMLDivElement;
    if (target.className.includes("knob")) return;
    const { width, x } = target.getBoundingClientRect();
    const newValue = ((mouseX - x) / width) * 100;
    setValue(newValue);
    props.onChange && props.onChange(newValue);

    /** Vertical */
    // const mouseY = e.clientY;
    // const target = e.target as HTMLDivElement;
    // if (target.className.includes("knob")) return;
    // const { height, y } = target.getBoundingClientRect();
    // const newValue = ((height - (mouseY - y)) / height) * 100;
    // setValue(newValue);
    // props.onChange && props.onChange(newValue);
  };

  return (
    <div class="slider vertical">
      <div
        class="track-wrapper"
        onPointerMove={(e) => pointerDown() && onChange(e)}
        onPointerLeave={() => setPointerDown(false)}
        onPointerDown={() => setPointerDown(true)}
        onClick={(e) => onChange(e)}
      >
        <div class="track" ref={trackRef!}>
          <div
            class="knob"
            // style={{ top: `${100 - value()}%` }}
            style={{ left: `${value()}%` }}
            onPointerDown={() => setPointerDown(true)}
            onPointerUp={() => setPointerDown(false)}
          />
        </div>
      </div>
    </div>
  );
}

export { Slider };
