import { Box, Divider, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PostService from "../../services/PostService";
import { useQuery } from "react-query";
import { getPosts } from "../config/handlePost";
import SkeletonContainer from "../misselation/SkeletonContainer";
import Post from "../misselation/Post";
import { UseAuth } from "../../context/UseAuth";
const PostWarapper = () => {
  const queryPosts = useQuery("queryPosts", () => PostService.getPosts());
  const { newPost, setNewPost, fetchAgain } = UseAuth();
  const Toast = useToast();

  if (queryPosts.isError) {
    if (queryPosts.error.message) {
      console.log(queryPosts.error);
      Toast({
        description: queryPosts.error.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } else {
      Toast({
        description: "Verifique sua internet",
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  }

  const posts = queryPosts?.data?.data?.data || getPosts() || [];
  useEffect(() => {
    if (newPost) {
      posts.unshift(newPost);
      setNewPost({});
    }
  }, [fetchAgain]);
  console.log(queryPosts);
  return (
    <VStack
      display="flex"
      flexDir="column"
      w={{ base: "100%", md: "540px" }}
      borderRadius="4px"
      background="white"
      alignItems="start"
      divider={<Divider />}
    >
      {queryPosts.isLoading ? (
        <SkeletonContainer />
      ) : (
        posts.map((post, index) => (
          <Post key={index + `_key_` + post?.description} post={post} />
        ))
      )}
    </VStack>
  );
};

export default PostWarapper;
