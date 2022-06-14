import "./IconButton.sass";

interface IIconButtonProps {
  onClick: () => void;
}

function IconButton(props: IIconButtonProps) {
  return (
    <button class="button" onClick={props?.onClick}>
      Button
    </button>
  );
}

export { IconButton };
