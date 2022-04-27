import { mergeProps } from "solid-js";

function StubComponent(props: { text: string }) {
  const mergedProps = mergeProps(props);

  return (
    <div>
      <h1>{mergedProps.text}</h1>
    </div>
  );
}

export default {
  title: "Temp/Stub",
  component: StubComponent,
};

export const WithText = () => <StubComponent text={"Hello World!"} />;

WithText.storyName = "Default";
