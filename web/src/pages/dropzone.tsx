import { withUrqlClient } from "next-urql";
import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { createUrqlClient } from "../utils/createUrqlClient";

const Droppage: React.FC<{}> = ({}) => {
  const [, setFileToUpload] = useState();
  //   const onDrop = useCallback(
  //     ([file]) => {
  //       setFileToUpload(file);
  //     },
  //     [setFileToUpload]
  //   );

  //   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Dropzone
      onDrop={useCallback(
        ([file]) => {
          setFileToUpload(file);
        },
        [setFileToUpload]
      )}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default withUrqlClient(createUrqlClient)(Droppage);
