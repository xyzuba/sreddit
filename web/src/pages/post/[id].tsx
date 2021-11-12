import { Box, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { EditDeleteCont } from "../../components/EditDeleteCont";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetConstFromUrl } from "../../utils/useGetPostFromUrl";
import NextLink from "next/link";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetConstFromUrl();

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Heading mb={5}>This post doesn't exist</Heading>
        <NextLink href="/">
          <Link>Go to the main page</Link>
        </NextLink>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box mb={1} p={7} shadow="md" borderWidth="1px" borderRadius="10px">
        <Heading fontSize={35}> {data.post.title}</Heading>
        <br />
        <Box fontSize={22}> {data.post.text}</Box>
      </Box>
      <EditDeleteCont id={data.post.id} authorId={data.post.author.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Post as any);
