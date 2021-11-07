import { Box } from "@chakra-ui/react";
import React from "react";

export type WrapperVariarnt = "small" | "regular";

interface WrapperProps {
  variant?: WrapperVariarnt;
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      maxWidth={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mx="auto"
      mt={8}
    >
      {children}
    </Box>
  );
};
