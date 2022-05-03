import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/userIsAuth";
// import NextLink from "next/link";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  //-----------------------------
  // INTEGRATING PICTURES
  //-----------------------------

  const [uploadedFile, setUploadedFile] = useState({
    public_id: "",
  });
  const onDrop = useCallback((acceptedFiles) => {
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
      setUploadedFile({ public_id: data.public_id });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  //-----------------------------
  //-----------------------------
  //-----------------------------

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({
            input: values,
            img: uploadedFile.public_id,
          });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Flex justifyContent="space-between">
              <Button
                mt={4}
                type="submit"
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
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
            console.log(uploadedFile.public_id);
          }}
        />
        <Text textAlign="center">Drop Zone</Text>
      </Box>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
