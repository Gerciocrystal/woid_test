import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const SkeletonContainer = () => {
  return (
    <Stack spacing={2}>
      <Skeleton height="320px" />
      <Skeleton height="320px" />
      <Skeleton height="320px" />
      <Skeleton height="320px" />
    </Stack>
  );
};

export default SkeletonContainer;
