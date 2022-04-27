import { createEffect, createSignal, mergeProps } from "solid-js";
import "./Potentiometer.sass";

interface IPotentiometerProps {
  percent: number;
  onChange?: Function;
  clipped?: boolean;
}

const clamp = (v: number, min: number, max: number): number => {
  return Math.max(min, Math.min(v, max));
};

function Potentiometer(props: IPotentiometerProps) {
  let knob: HTMLDivElement;
  let [value, setValue] = createSignal(props.percent);
  let [grabbed, setGrabbed] = createSignal(false);

  createEffect(() => setValue(props.percent));

  const onPointerMove = (e: MouseEvent) => {
    if (!grabbed()) return;
    const { left, top, width, height } = knob.getBoundingClientRect();
    const vec = [
      width * 0.5 - (e.clientX - left),
      height * 0.5 - (e.clientY - top),
    ];
    const angle = (Math.atan2(vec[1], vec[0]) * 180) / Math.PI + 180;
    setValue(clamp(angle, 0, 360));
    props.onChange && props.onChange(value());
  };

  return (
    <div
      class="potentiometer"
      onPointerDown={() => setGrabbed(true)}
      onPointerUp={() => setGrabbed(false)}
      onPointerLeave={() => setGrabbed(false)}
      onPointerMove={(e) => onPointerMove(e)}
    >
      <div
        class="knob"
        ref={knob}
        style={{
          transform: `rotate(${value()}deg)`,
        }}
      >
        <div class="angle-indicator" />
      </div>
    </div>
  );
}

export { Potentiometer };
