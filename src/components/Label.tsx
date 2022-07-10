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
  style: object;
};

function Label(props: LabelProps) {
  return (
    <div class={["container", props.orientation].join(" ")} style={props.style}>
      <label class="text">{props.text}</label>
      {props.children}
    </div>
  );
}

export { Label, LabelProps, LabelOrder, LabelOrientatian };
