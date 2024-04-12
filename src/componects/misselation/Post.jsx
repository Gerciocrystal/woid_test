import React from "react";
import PropTypes from "prop-types";
import { Box, Image } from "@chakra-ui/react";

import Header from "./post/Header";
const Post = ({ post }) => {
  return (
    <Box
      minW="250px"
      display="flex"
      flexDir="column"
      borderRadius="4px"
      p={3}
      px={4}
    >
      <Header post={post} />
      {post?.type == "photo" ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Image src={post?.image} alt={post?.title || "Foto indisponivel"} />
        </Box>
      ) : (
        <Box textAlign="justify" fontSize="sm">
          {post?.description}
        </Box>
      )}
    </Box>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
