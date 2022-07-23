import { Label, LabelOrientatian, Select } from "../../components";

const SimpleSelectStory = () => {
  return (
    <Label text="Selection" orientation={LabelOrientatian.COLUMN}>
      <Select
        options={["A", "B", "C", "D"]}
        onSelect={(e, i) => {
          console.log(e, i);
        }}
      />
    </Label>
  );
};

const EnumSelectStory = () => {
  enum Options {
    OPTION_A,
    OPTION_B,
    OPTION_C,
  }

  return (
    <Label text="Selection" orientation={LabelOrientatian.COLUMN}>
      <Select
        options={Object.values(Options).filter((e: any) => isNaN(e))}
        onSelect={(e, i) => {
          console.log(e, i);
        }}
      />
    </Label>
  );
};

const ComplexSelectStory = () => {
  const options = [
    {
      name: "Channel 1",
      count: 12,
      internalAddress: 255,
    },
    {
      name: "Channel 2",
      count: 42,
      internalAddress: 128,
    },
    {
      name: "Channel 3",
      count: 9,
      internalAddress: 7,
    },
  ];

  return (
    <Label text="Selection" orientation={LabelOrientatian.COLUMN}>
      <Select
        options={options}
        onSelect={(e, i) => {
          console.log(e, i);
        }}
        formatOption={(o) => (
          <span>
            {o.name} → {o.internalAddress}
          </span>
        )}
      />
    </Label>
  );
};

SimpleSelectStory.storyName = "Selection (Simple)";
EnumSelectStory.storyName = "Selection (Enum)";
ComplexSelectStory.storyName = "Selection (Objects)";

export { SimpleSelectStory, EnumSelectStory, ComplexSelectStory };
