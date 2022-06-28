import "./IconButton.sass";

interface IIconButtonProps {
  onClick: () => void;
  children: JSX.Element;
}

function IconButton(props: IIconButtonProps) {
  return (
    <button class="button" onClick={props?.onClick}>
      {props.children}
    </button>
  );
}

export { IconButton };
