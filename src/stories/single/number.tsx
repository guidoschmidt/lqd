import { createStore } from "solid-js/store";
import { NumberInput, Label, LabelOrientatian } from "../../components";

const NumberInputStory = () => (
  <Label text="Numerical Input" orientation={LabelOrientatian.COLUMN}>
    <NumberInput value={100} onChange={() => {}} />
  </Label>
);

NumberInputStory.storyName = "Numbper Input";

const ArrayNumberInputStory = () => {
  const [values, updateValues] = createStore(
    new Array(200).fill(0).map((_) => Math.round(Math.random() * 500))
  );

  return (
    <Label
      text="Numerical Input"
      orientation={LabelOrientatian.COLUMN}
      style={{ display: "grid", "grid-template-columns": "repeat(5, auto)" }}
    >
      {values.map((v: number, i: number) => {
        return (
          <NumberInput
            value={v}
            onChange={(nv: number) => updateValues(i, nv)}
          />
        );
      })}
    </Label>
  );
};

NumberInputStory.storyName = "Numbper Input";
ArrayNumberInputStory.storyName = "Array<Number Input>";

export { NumberInputStory, ArrayNumberInputStory };
