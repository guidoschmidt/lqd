import { Potentiometer, NumericalInput } from "../components";

export default {
  title: "Components/Potentiometer",
  component: Potentiometer,
};

export const PotentiometerStory = () => <Potentiometer percent={0} />;
PotentiometerStory.storyName = "Potentiometer";

export const NumericalInputStory = () => (
  <NumericalInput value={100} onChange={() => {}} />
);
NumericalInputStory.storyName = "Numerical Input";
