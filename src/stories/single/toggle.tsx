import { createStore } from "solid-js/store";
import { Toggle, Label } from "../../components";

const ToggleStory = () => <Toggle on={true} />;
ToggleStory.storyName = "Toggle";

const ToggleArrayStory = () => {
  const [toggleValues, updateToggleValues] = createStore(
    new Array(100).fill(0).map((_) => Math.random() > 0.5)
  );

  return (
    <Label
      text="Toggle Array"
      style={{
        width: "fit-content",
        display: "grid",
        "grid-template-columns": "repeat(10, 1fr)",
        "grid-gap": "0px",
      }}
    >
      {toggleValues.map((v: boolean, i: number) => (
        <Toggle on={v} onChange={(v) => updateToggleValues(i, v)} />
      ))}
    </Label>
  );
};

ToggleArrayStory.storyName = "Array<Toggle>";

export { ToggleStory, ToggleArrayStory };
