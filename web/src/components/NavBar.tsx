import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    //data is loading
  } else if (!data?.me) {
    //user is not logged in
    body = (
      <>
        <Box>
          <NextLink href="/login">
            <Link mr={4}>login</Link>
          </NextLink>
          <NextLink href="/register">
            <Link>register</Link>
          </NextLink>
        </Box>
      </>
    );
  } else {
    //user is logged in
    body = (
      <Flex>
        <Box>
          <Box>{data.me.username}</Box>
          <Button
            onClick={async () => {
              await logout();
              router.reload();
            }}
            isLoading={logoutFetching}
            variant="link"
            mt={3}
          >
            logout
          </Button>
        </Box>
      </Flex>
    );
  }

  return (
    <Box zIndex={1} position="sticky" top={0} bg="teal" p={4}>
      <Flex
        justifyContent="space-between"
        ml={"auto"}
        color="white"
        fontSize="xl"
        alignItems="center"
      >
        <Flex alignItems="center">
          <NextLink href="/">
            <Heading>
              <Link>sReddit</Link>
            </Heading>
          </NextLink>
          {data?.me ? (
            <NextLink href="/create-post">
              <Button ml={8}>create post</Button>
            </NextLink>
          ) : (
            <div></div>
          )}
        </Flex>
        {body}
      </Flex>
    </Box>
  );
};
