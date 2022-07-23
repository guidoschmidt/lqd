import { createSignal } from "solid-js";
import { Label, TextInput } from "../../components";

const TextInputStory = () => {
  const [text, setText] = createSignal<string>("Test");

  return (
    <Label text="Text Input">
      <code>{text()}</code>
      <TextInput value={text()} onChange={(v: string) => setText(v)} />
    </Label>
  );
};

TextInputStory.storyName = "Text Input";

export { TextInputStory };
