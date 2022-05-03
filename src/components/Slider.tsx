import { createSignal } from "solid-js";
import "./Slider.sass";

interface ISliderProps {
  value: number;
}

function Slider(props: ISliderProps) {
  const [value, setValue] = createSignal(props.value);
  const [pointerDown, setPointerDown] = createSignal(false);

  let trackRef: HTMLDivElement;

  const onChange = (e: PointerEvent) => {
    const mouseX = e.clientX;
    const target = e.target as HTMLDivElement;
    if (target.className.includes("knob")) return;
    const { width, x } = target.getBoundingClientRect();
    const newValue = ((mouseX - x) / width) * 100;
    setValue(newValue);
  };

  return (
    <div class="slider">
      <div
        class="track-wrapper"
        onPointerMove={(e) => pointerDown() && onChange(e)}
        onPointerLeave={() => setPointerDown(false)}
        onClick={onChange}
      >
        <div class="track" ref={trackRef}>
          <div
            class="knob"
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
