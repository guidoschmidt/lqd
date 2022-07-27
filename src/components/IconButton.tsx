// import "./IconButton.sass";
import "scss.ui.toolkit/6-components/_button.scss";

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
