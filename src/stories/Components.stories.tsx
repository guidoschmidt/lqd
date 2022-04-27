import { Potentiometer } from "../components";

export default {
  title: "Components/Potentiometer",
  component: Potentiometer,
};

export const PotentiometerStory = () => <Potentiometer percent={0} />;
PotentiometerStory.storyName = "Potentiometer";
