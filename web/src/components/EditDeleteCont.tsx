import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeleteContProps {
  id: number;
  authorId: number;
}

export const EditDeleteCont: React.FC<EditDeleteContProps> = ({
  id,
  authorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data }] = useMeQuery();

  if (data?.me?.id !== authorId) {
    return null;
  }

  return (
    <Box ml="auto" w="max-content">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
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
            id,
          });
        }}
      />
    </Box>
  );
};
