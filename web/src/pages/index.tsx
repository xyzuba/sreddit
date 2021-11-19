import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeleteCont } from "../components/EditDeleteCont";
import { Layout } from "../components/Layout";
import { UpvoteSec } from "../components/UpvoteSec";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });
  if (!fetching && !data) {
    return <div>{error?.message}</div>;
  }

  return (
    <Layout>
      {fetching && !data ? (
        <Spinner />
      ) : (
        //<Flex>
        <Stack spacing={12} mb={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex
                pos="relative"
                borderRadius="10px"
                bgColor="#2A2A35"
                _hover={{
                  backgroundColor: "#2e2e3b",
                  borderRadius: "10px",
                  transition: ".2s",
                }}
              >
                <UpvoteSec post={p} />
                <Flex w="100%" flexDirection="column">
                  <Box
                    key={p.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="0 10px 10px 0"
                    w="100%"
                    h="100%"
                  >
                    <Flex justifyContent="space-between">
                      <NextLink href="post/[id]" as={`post/${p.id}`}>
                        <Link>
                          <Heading fontSize={25}>{p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Flex alignSelf="center">
                        <Text
                          alignSelf="flex-end"
                          fontSize={15}
                          color="grey"
                          mr={1}
                        >
                          posted by
                        </Text>
                        <NextLink href="user/[id]" as={`user/${p.author.id}`}>
                          <Link fontSize={18} alignSelf="flex-end">
                            {p.author.username}
                          </Link>
                        </NextLink>
                      </Flex>
                    </Flex>
                    <Text mt={4} fontSize={20}>
                      {p.textSnippet}
                    </Text>
                  </Box>
                  <Flex
                    alignContent="flex-end"
                    pos="absolute"
                    right={0}
                    bottom={-9}
                  >
                    <EditDeleteCont id={p.id} authorId={p.author.id} />
                  </Flex>
                </Flex>
              </Flex>
            )
          )}
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
