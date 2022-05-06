import { createSignal } from "solid-js";
import { Potentiometer, NumericalInput, Slider } from "../components";

export default {
  title: "Components/Single",
  component: Potentiometer,
};

export const PotentiometerStory = () => <Potentiometer percent={0} />;
PotentiometerStory.storyName = "Potentiometer";

export const NumericalInputStory = () => (
  <NumericalInput value={100} onChange={() => {}} />
);
NumericalInputStory.storyName = "Numerical Input";

export const SliderStory = () => <Slider value={0} />;
SliderStory.storyName = "Slider";

export const SliderArrayStory = () => {
  const [value, setValue] = createSignal(0);

  return (
    <div
      style={{
        display: "flex",
        "flex-wrap": "wrap",
      }}
    >
      {new Array(24).fill(0).map((_, i: number) => (
        <Slider value={value()} onChange={(nv) => setValue(nv)} />
      ))}
    </div>
  );
};
SliderStory.storyName = "Slider";
