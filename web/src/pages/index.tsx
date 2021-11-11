import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { UpvoteSec } from "../components/UpvoteSec";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  if (!fetching && !data) {
    return <div>query failed</div>;
  }

  return (
    <Layout>
      {fetching && !data ? (
        <div>loading...</div>
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
                        <Text fontSize={18} alignSelf="flex-end">
                          {p.author.username}
                        </Text>
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
                    // shadow="md"
                    // borderWidth="0 1px 1px 1px"
                    // borderRadius="0 0 10px 0"
                    // bg="transparent"
                  >
                    {meData?.me?.id !== p.author.id ? null : (
                      <Box ml="auto" w="max-content">
                        <NextLink
                          href="/post/edit/[id]"
                          as={`/post/edit/${p.id}`}
                        >
                          <IconButton
                            size="sm"
                            variant="ghost"
                            mx={1}
                            aria-label="edit post"
                            color="grey"
                            icon={<EditIcon />}
                          />
                        </NextLink>
                        <IconButton
                          // fontSize="sm"
                          size="sm"
                          variant="ghost"
                          mx={1}
                          aria-label="delete post"
                          color="gray"
                          icon={<DeleteIcon />}
                          onClick={() => {
                            deletePost({
                              id: p.id,
                            });
                          }}
                        />
                      </Box>
                    )}
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
