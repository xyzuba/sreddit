import { Box, Flex, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Profile = () => {
  const [{ data }] = useMeQuery();

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ username: data?.me?.id, password: "" }}
        onSubmit={}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Title" />
            <Box mt={4}>
              <InputField textarea name="username" label="Body" />
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
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
