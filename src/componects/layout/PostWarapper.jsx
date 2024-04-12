import { Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import PostService from "../../services/PostService";
import { useQuery } from "react-query";
import { getPosts } from "../config/handlePost";
const PostWarapper = () => {
  const queryPosts = useQuery("queryPosts", () => PostService.getPosts());
  const [data, setData] = useState([]);
  const Toast = useToast();

  if (queryPosts.isError) {
    if (queryPosts.error.message) {
      Toast({
        description: queryPosts.error.message,
        status: "error",
        position: "top",
      });
    } else {
      Toast({
        description: "Verifique sua internet",
        status: "error",
        position: "top",
      });
    }
  }
  const posts = queryPosts?.data?.data?.data || getPosts();
  return (
    <Box
      display="flex"
      flexDir="column"
      w={{ base: "100%", md: "520px" }}
      borderRadius="4px"
      background="white"
    >
      Posts
    </Box>
  );
};

export default PostWarapper;
