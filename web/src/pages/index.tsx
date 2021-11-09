import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  if (!fetching && !data) {
    return <div>query failed</div>;
  }

  return (
    <Layout>
      <Flex>
        <Heading color="grey">sReddit</Heading>
        <NextLink href="/create-post">
          <Link ml={"auto"} mt={"auto"}>
            create post
          </Link>
        </NextLink>
      </Flex>
      <br />
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} mb={8}>
          {data!.posts.posts.map((p) => (
            <Box p={5} shadow="md" borderWidth="1px">
              <Flex justifyContent="space-between">
                <Heading fontSize="xl">{p.title}</Heading>
                <Flex>
                  <Text alignSelf="flex-end" fontSize={15} color="grey" mr={1}>
                    posted by
                  </Text>
                  <Text fontSize={18}>{p.author.username}</Text>
                </Flex>
              </Flex>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}
            m={"auto"}
            my={10}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
