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

export const SliderStory = () => <Slider value={50} />;
SliderStory.storyName = "Slider";
