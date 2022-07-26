import { createSignal } from "solid-js";
import "scss.ui.toolkit/6-components/_fileupload.scss";

type FileUploadProps = {
  onFileChange?: (f: File) => void;
};

function FileUpload(props: FileUploadProps) {
  const [filename, setFilename] = createSignal("");

  let inputRef: HTMLInputElement;

  const onUpload = (e: InputEvent) => {
    const { files } = e.target as HTMLInputElement;
    const latestFile = files[files?.length - 1];
    setFilename(latestFile.name);
    props.onFileChange && props.onFileChange(latestFile);
    inputRef.value = "";
  };

  return (
    <div class="file-upload">
      <input id="upload" type="file" onInput={onUpload} ref={inputRef} />
      <label class="button" for="upload">
        Upload
      </label>
      <span class="filename">{filename()}</span>
      <button>Do Something</button>
      <button onClick={() => (inputRef.value = "")}>Clear</button>
    </div>
  );
}

export { FileUpload };
