import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import { EditDeleteCont } from "../../components/EditDeleteCont";
import { Layout } from "../../components/Layout";
import { UpvoteSec } from "../../components/UpvoteSec";
import { useFilteredPostsQuery, useUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

const Profile = () => {
  const intId = useGetIntId();
  const [{ data }] = useUserQuery({
    variables: {
      id: intId,
    },
  });
  const [pdata] = useFilteredPostsQuery({
    variables: {
      id: intId,
    },
  });

  if (!data?.user) {
    return <div>No user</div>;
  }

  const timestamp = parseInt(data.user.createdAt);
  const formatDate = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(timestamp);

  return (
    <Layout variant="xl">
      <Flex flexDirection="row" justifyContent="space-evenly">
        <Flex
          height="max-content"
          pos="relative"
          borderRadius="10px"
          bgColor="#2A2A35"
          p={5}
          shadow="md"
          borderWidth="1px"
          flexDirection="column"
          width="50%"
          mr={4}
        >
          <Box
            borderRadius="100px"
            height="100px"
            width="100px"
            alignSelf="center"
            alignContent="center"
            border="1px solid"
          ></Box>
          <Heading alignSelf="center">{data.user.username}</Heading>
          <Text mt={2}>Created account: {formatDate}</Text>
        </Flex>
        <Flex
          pos="relative"
          borderRadius="10px"
          bgColor="#2A2A35"
          p={5}
          shadow="md"
          borderWidth="1px"
          flexDirection="column"
          width="100%"
        >
          <Heading mb={4}>Posts by {data.user.username}</Heading>
          <Stack spacing={12} mb={8}>
            {pdata!.data?.filteredPosts?.posts?.map((p) =>
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
                        <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                          <Link>
                            <Heading fontSize={25}>{p.title}</Heading>
                          </Link>
                        </NextLink>
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
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
