import { Box, Heading } from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { EditDeleteCont } from "../../components/EditDeleteCont";
import { Layout } from "../../components/Layout";
import { useGetConstFromUrl } from "../../utils/useGetPostFromUrl";

export const Post = ({}) => {
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
    return router.push("/");
  }

  return (
    <Layout>
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="10px">
        <Heading fontSize={35}> {data?.post?.title}</Heading>
        <br />
        <Box fontSize={22}> {data?.post?.text}</Box>
      </Box>
      <EditDeleteCont id={data.post.id} authorId={data.post.author.id} />
    </Layout>
  );
};
