import { createEffect, createSignal } from "solid-js";
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
    e.preventDefault();
    if (!grabbed()) return;
    onClick(e);
  };

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement;
    const { width, height, x, y } = target.getBoundingClientRect();
    const xRel = width * 0.5 - (e.clientX - x);
    const yRel = height * 0.5 - (e.clientY - y);
    const vec = [-xRel, yRel];
    const angle = (Math.atan2(vec[0], vec[1]) + Math.PI) * (180 / Math.PI);
    setValue(clamp(angle / 3.6, 0, 100));
    props?.onChange && props.onChange(clamp(angle / 3.6, 0, 100));
  };

  return (
    <div class="potentiometer">
      <div
        class="knob-wrapper"
        onClick={(e) => onClick(e)}
        onPointerDown={() => setGrabbed(true)}
        onPointerUp={() => setGrabbed(false)}
        onPointerLeave={() => setGrabbed(false)}
        onPointerMove={(e) => onPointerMove(e)}
        style={{
          cursor: grabbed() ? "grab" : "pointer",
        }}
      >
        <div
          class="knob"
          ref={knob!}
          style={{
            transform: `rotate(${value() * 3.6}deg)`,
          }}
        >
          <div class="angle-indicator" />
        </div>
      </div>
    </div>
  );
}

export { Potentiometer };
