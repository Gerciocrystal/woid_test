import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";

const Post = ({ post }) => {
  return <Box minW="250px">i am a post</Box>;
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
