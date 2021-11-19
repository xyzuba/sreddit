import { Box, Flex, Heading, Link, Spinner } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { EditDeleteCont } from "../../components/EditDeleteCont";
import { FullUpvoteSec } from "../../components/FullUpvoteSec";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetConstFromUrl } from "../../utils/useGetPostFromUrl";
//@ts-ignore
import { Image } from "cloudinary-react";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetConstFromUrl();

  if (fetching) {
    return (
      <Layout>
        <Flex justifyContent="center">
          <Spinner />
        </Flex>
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
      <Flex flexDirection="row" mb={2}>
        <FullUpvoteSec post={data.post} />
        <Box
          p={7}
          shadow="md"
          borderWidth="1px"
          borderRadius="0 10px 10px 0"
          width="100%"
        >
          <Heading fontSize={35}> {data.post.title}</Heading>
          <br />
          <Box fontSize={22} mb={2}>
            {data.post.text}
          </Box>
          <Image
            cloudName={"sreddit-yehor"}
            publicId={data.post.picture}
            width="max-content"
          />
        </Box>
      </Flex>
      <EditDeleteCont id={data.post.id} authorId={data.post.author.id} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Post);
