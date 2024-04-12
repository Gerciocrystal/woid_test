import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  HStack,
  VStack,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import { FiUpload } from "react-icons/fi";
import moment from "moment";
const Header = ({ post }) => {
  const date_temp = moment(post?.createdAt).utc();
  return (
    <Box w="100%" display="flex" justifyContent="space-between" mb={4}>
      <HStack>
        <Box display="flex" gap={2} alignItems="center">
          <Avatar name={post?.author || "None"} size="sm" />
          <VStack spacing={0} alignItems="start">
            <Text fontSize="md" fontWeight="semibold">
              {post?.author || "None"}
            </Text>
            <Text fontSize="sm">
              {moment(date_temp, "YYYY-MM-DD").locale("pt").fromNow()}
            </Text>
          </VStack>
        </Box>
      </HStack>
      <HStack spacing={1}>
        <IconButton icon={<FiUpload />} background="transparent" />
        <IconButton icon={<HiDotsVertical />} background="transparent" />
      </HStack>
    </Box>
  );
};

Header.propTypes = {
  post: PropTypes.object,
};

export default Header;
