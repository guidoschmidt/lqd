import { createSignal } from "solid-js";
import {
  Potentiometer,
  NumericalInput,
  Slider,
  RadioButton,
  TextInput,
} from "../components";

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

export const RadioButtonStory = () => <RadioButton on={true} />;
RadioButtonStory.storyName = "Radio Button";

export const RadioButtonArrayStory = () => {
  const [value, setValue] = createSignal(0);

  return (
    <div
      style={{
        width: "fit-content",
        display: "grid",
        "grid-template-columns": "repeat(10, 1fr)",
        "grid-gap": "0px",
      }}
    >
      {new Array(30).fill(0).map((_) => (
        <RadioButton on={Math.random() < 0.5} />
      ))}
    </div>
  );
};
RadioButtonStory.storyName = "Radio Button";

export const TextInputStory = () => {
  const [text, setText] = createSignal<string>("Test");

  return (
    <div>
      <code>{text()}</code>
      <TextInput value={text()} onChange={(v: string) => setText(v)} />
    </div>
  );
};
TextInputStory.storyName = "Text Input";
