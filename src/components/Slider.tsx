import { createSignal, createEffect } from "solid-js";
import "./Slider.sass";

export enum SliderOrientation {
  Horizontal,
  Vertical,
}

interface ISliderProps {
  value: number;
  onChange?: (v: number) => any;
  orientation?: SliderOrientation;
}

function Slider(props: ISliderProps) {
  const [value, setValue] = createSignal(props.value);
  const [pointerDown, setPointerDown] = createSignal(false);

  let trackRef: HTMLDivElement;

  createEffect(() => setValue(props.value));

  const onChange = (e: PointerEvent | MouseEvent) => {
    /** Horizontal */
    if (props.orientation == SliderOrientation.Horizontal) {
      const mouseX = e.clientX;
      const target = e.target as HTMLDivElement;
      if (target.className.includes("knob")) return;
      const { width, x } = target.getBoundingClientRect();
      const newValue = ((mouseX - x) / width) * 100;
      setValue(newValue);
      props.onChange && props.onChange(newValue);
    }
    /** Vertical */
    if (props.orientation == SliderOrientation.Vertical) {
      const mouseY = e.clientY;
      const target = e.target as HTMLDivElement;
      if (target.className.includes("knob")) return;
      const { height, y } = target.getBoundingClientRect();
      const newValue = ((height - (mouseY - y)) / height) * 100;
      setValue(newValue);
      props.onChange && props.onChange(newValue);
    }
  };

  return (
    <div
      class={`slider ${
        props.orientation === SliderOrientation.Vertical
          ? "vertical"
          : "horizontal"
      }`}
    >
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
            style={
              props.orientation === SliderOrientation.Vertical
                ? { top: `${100 - value()}%` }
                : { left: `${value()}%` }
            }
            onPointerDown={() => setPointerDown(true)}
            onPointerUp={() => setPointerDown(false)}
          />
        </div>
      </div>
    </div>
  );
}

export { Slider };
