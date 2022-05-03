import { withUrqlClient } from "next-urql";
import React, { useCallback } from "react";
import { useState } from "react";
//@ts-ignore
import { Image } from "cloudinary-react";
import { Layout } from "../components/Layout";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDropzone } from "react-dropzone";
import { Box, Text } from "@chakra-ui/react";
import { useCreatePostMutation } from "../generated/graphql";

interface uploadProps {}

const Upload: React.FC<uploadProps> = ({}) => {
  const [uploadedFile, setUploadedFile] = useState({
    // public_id: "",
  });
  const onDrop = useCallback((acceptedFiles: any) => {
    const url = "https://api.cloudinary.com/v1_1/sreddit-yehor/upload";

    acceptedFiles.forEach(async (acceptedFile: any) => {
      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("upload_preset", "nzxecqni");

      const response = await fetch(url, {
        method: "post",
        body: formData,
      });
      const data = await response.json();
      // console.log(data.public_id);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });
  return (
    <Layout>
      <>
        <Box
          alignContent="center"
          w={"100px"}
          h={"100px"}
          border="1px solid white"
          {...getRootProps()}
        >
          <input
            {...getInputProps()}
            onSubmit={() => {
              console.log(uploadedFile);
            }}
          />
          <Text textAlign="center">Drop Zone</Text>
        </Box>

        <ul>
          {/* <li key={uploadedFile}>
            <Image
              cloudName={"sreddit-yehor"}
              publicId={uploadedFile}
              width="100"
              crop="scale"
            />
          </li> */}
        </ul>
      </>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Upload);
