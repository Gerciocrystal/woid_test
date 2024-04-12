import React, { useState } from "react";
import PropTypes from "prop-types";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { MdPostAdd } from "react-icons/md";
import {
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NotificationBagde, { Effect } from "react-notification-badge";
import { BellIcon } from "@chakra-ui/icons";
import MenuIcons from "./misselation/MenuIcons";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import AddPost from "./modals/AddPost";
import { getPosts } from "./config/handlePost";

const Header = ({ fecthAgain, setFecthAgain }) => {
  let notification = getPosts() ? getPosts() : [];
  console.log();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [postType, setPostType] = useState();
  const changeType = (type) => {
    setFecthAgain(!fecthAgain);
    setPostType(type);
    onOpen();
  };
  return (
    <Box
      display="flex"
      p={4}
      justifyContent="space-between"
      width="100%"
      background="white"
      flexWrap="wrap"
    >
      <Text fontSize="xl" fontWeight="bold" order={1}>
        Home
      </Text>
      <Box
        display="flex"
        justifyContent="center"
        gap={2}
        order={{ base: 3, md: 2 }}
        width={{ base: "100%", md: "40%" }}
      >
        <Avatar size="sm" name="Utilizador" />
        <Input placeholder="pesquise por alguem" />
        <HStack spacing={2}>
          <MenuIcons
            Icon={MdPostAdd}
            background="blue"
            onOpen={() => onOpen("post")}
          />
          <MenuIcons
            Icon={MdOutlineAddPhotoAlternate}
            background="green"
            onOpen={() => changeType("photo")}
          />
          <MenuIcons
            Icon={MdOutlineAddToPhotos}
            background="orange"
            onOpen={() => console.log("sem função")}
          />
        </HStack>
      </Box>

      <Button
        order={{ base: 2, md: 3 }}
        background="white"
        borderRadius="full"
        leftIcon={<BellIcon fontSize="3xl" />}
      >
        <NotificationBagde
          position="absolute"
          count={notification.length}
          effect={Effect.SCLALE}
        />
      </Button>
      <AddPost isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

Header.propTypes = {};

export default Header;
