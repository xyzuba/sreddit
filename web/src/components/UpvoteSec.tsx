import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSecProps {
  post: PostSnippetFragment;
}

export const UpvoteSec: React.FC<UpvoteSecProps> = ({ post }) => {
  const [, vote] = useVoteMutation();

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      shadow="md"
      borderRadius="10px 0 0 10px"
      borderWidth="1px 0 1px 1px"
      p={3}
    >
      <IconButton
        aria-label="upvote"
        variant={post.voteStatus === 1 ? "solid" : "ghost"}
        fontSize="lg"
        onClick={() => {
          if (post.voteStatus === 1) {
            return;
          }
          vote({
            postId: post.id,
            value: 1,
          });
        }}
        colorScheme={post.voteStatus === 1 ? "teal" : undefined}
        icon={<ArrowUpIcon />}
      />
      <Box>{post.points}</Box>
      <IconButton
        aria-label="downvote"
        variant={post.voteStatus === -1 ? "solid" : "ghost"}
        fontSize="lg"
        onClick={() => {
          if (post.voteStatus === -1) {
            return;
          }
          vote({
            postId: post.id,
            value: -1,
          });
        }}
        colorScheme={post.voteStatus === -1 ? "red" : undefined} //#F47174
        icon={<ArrowDownIcon />}
      />
    </Flex>
  );
};
