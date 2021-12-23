import React, { useRef } from "react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { fileSize, isNull } from "../common/utils/CowayUtils";
import { cilClipboard } from "@coreui/icons";

const DropZone = (props) => {
  // console.log("Dropzone props >> ", props);

  const fileInputRef = useRef();
  const fileMessage = useRef();
  const isEmpty = props.isEmpty;
  const filename = props.filename;
  const isEdit = props.isEdit; //  수정 여부

  // console.log("isEmpty >> ", isEmpty);

  const handleFiles = (files) => {
    // console.log("@@@ handleFiles >>> ", files[0]);

    if (isEdit) return;

    if (files.length !== 1) {
      fileMessage.current.innerHTML = `<span style="color: red">Error Uploading File(s)</span>`;
    } else {
      fileMessage.current.innerHTML = `<span style="color: #3f4447">${
        files[0].name
      } (${fileSize(files[0].size)})</span>  file(s) selected.`;

      props.onCreate(files[0]);
    }
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // console.log(files.length);
    if (files.length) {
      handleFiles(files);
    }
  };

  // const validateFile = (file) => {
  //   const validTypes = [
  //     "image/jpeg",
  //     "image/jpg",
  //     "image/png",
  //     "image/gif",
  //     "image/x-icon",
  //   ];
  //   if (validTypes.indexOf(file.type) === -1) {
  //     return false;
  //   }
  //   return true;
  // };

  const fileSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  return (
    <div className="form-row mt-4">
      <div
        className="file_upload"
        style={
          isEmpty === "is-invalid"
            ? { borderColor: "#e55353" }
            : { borderColor: "#bdd5fe" }
        }
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <CIcon
          className={`file_upload_icon ${
            isEmpty === "is-invalid" ? "error_color" : ""
          }`}
          icon={isNull(filename) ? icon.cilCloudUpload : icon.cilPaperclip}
          height={35}
        />
        <input
          type="file"
          name="file_upload"
          multiple
          ref={fileInputRef}
          onChange={fileSelected}
          disabled={isEdit}
        />
        {!isEdit ? (
          <p ref={fileMessage}>
            {isEmpty === "is-invalid" ? (
              <span className="error_color">
                Please insert the firmware file.
              </span>
            ) : (
              <span>Drag your files here or click in this area.</span>
            )}
          </p>
        ) : (
          <p>{filename}</p>
        )}
      </div>
    </div>
  );
};
export default DropZone;
