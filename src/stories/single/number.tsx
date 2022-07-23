import { NumberInput, Label } from "../../components";

const NumberInputStory = () => (
  <Label text="Numerical Input">
    <NumberInput value={100} onChange={() => {}} />
  </Label>
);

NumberInputStory.storyName = "Numbper Input";

export { NumberInputStory };
