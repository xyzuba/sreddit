import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { useUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetIntId } from "../../utils/useGetIntId";

const Profile = () => {
  const intId = useGetIntId();
  const [{ data }] = useUserQuery({
    variables: {
      id: intId,
    },
  });

  if (!data?.user) {
    return <div>No user</div>;
  }

  return (
    <Layout variant="xl">
      <Flex flexDirection="row" justifyContent="space-evenly">
        <Flex
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
          <Text mt={2}>Created account: 22.05.01</Text>
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
          <Heading>posts</Heading>
          <Text mt={2}>Posted: x posts</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Profile);
