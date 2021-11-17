import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariarnt = "small" | "regular" | "xl";

interface WrapperProps {
  variant?: WrapperVariarnt;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxWidth={
        variant === "xl"
          ? "1200px"
          : variant === "regular"
          ? "800px"
          : variant === "small"
          ? "400px"
          : "800px"
      }
      w="100%"
      mx="auto"
      mt={8}
    >
      {children}
    </Box>
  );
};
