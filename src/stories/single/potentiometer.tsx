import { Potentiometer, Label } from "../../components";

const PotentiometerStory = () => (
  <Label text="Volume">
    <Potentiometer percent={0} />
  </Label>
);

PotentiometerStory.storyName = "Potentiometer";

export { PotentiometerStory };
