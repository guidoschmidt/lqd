import { createStore } from "solid-js/store";
import { Slider, Label, SliderOrientation } from "../../components";

const SliderStory = () => (
  <Label text="Slider">
    <Slider value={0} orientation={SliderOrientation.Horizontal} />
    <Slider value={0} orientation={SliderOrientation.Vertical} />
  </Label>
);

SliderStory.storyName = "Slider";

const SliderArrayStory = () => {
  const [sliderValues, updateSliderValues] = createStore(
    new Array(200).fill(0).map(() => Math.random() * 100)
  );

  return (
    <Label
      text="Slider Array"
      style={{
        display: "flex",
        "flex-wrap": "wrap",
      }}
    >
      {new Array(200).fill(0).map((_, i: number) => (
        <Slider
          value={sliderValues[i]}
          onChange={(nv) => updateSliderValues(i, nv)}
          orientation={SliderOrientation.Vertical}
        />
      ))}
    </Label>
  );
};

SliderArrayStory.storyName = "Array<Slider>";

export { SliderArrayStory, SliderStory };
