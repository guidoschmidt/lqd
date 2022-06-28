import "./Label.sass";

enum LabelOrientatian {
  ROW = "row",
  COLUMN = "col",
}

enum LabelOrder {
  BEFORE = "before",
  AFTER = "after",
}

type LabelProps = {
  text: string;
  children: JSX.Element | JSX.Element[];
  orientation?: LabelOrientatian;
  order?: LabelOrder;
};

function Label(props: LabelProps) {
  return (
    <div class={["container", props.orientation].join(" ")}>
      <label class="text">{props.text}</label>
      {props.children}
    </div>
  );
}

export { Label, LabelProps, LabelOrder, LabelOrientatian };
