import { ColorInput, Label } from "../../components";

const ColorInputStory = () => {
  return (
    <Label text="Color Selector">
      <ColorInput color="#ff0000" />
    </Label>
  );
};

ColorInputStory.storyName = "Color Input";

export { ColorInputStory };
