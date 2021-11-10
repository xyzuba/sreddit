import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { UpvoteSec } from "../components/UpvoteSec";
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
        //<Flex>
        <Stack spacing={8} mb={8}>
          {data!.posts.posts.map((p) => (
            <Flex>
              <UpvoteSec post={p} />
              <Box
                pos="relative"
                key={p.id}
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="0 10px 10px 0"
                w="100%"
              >
                <Flex justifyContent="space-between">
                  <Heading fontSize={25}>{p.title}</Heading>
                  <Flex>
                    <Text
                      alignSelf="flex-end"
                      fontSize={15}
                      color="grey"
                      mr={1}
                    >
                      posted by
                    </Text>
                    <Text fontSize={18} alignSelf="flex-end">
                      {p.author.username}
                    </Text>
                  </Flex>
                </Flex>
                <Text mt={4} fontSize={20}>
                  {p.textSnippet}
                </Text>
              </Box>
            </Flex>
          ))}
        </Stack>
        //</Flex>
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
