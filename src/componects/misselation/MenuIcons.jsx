import React from "react";
import PropTypes from "prop-types";
import { Badge } from "@chakra-ui/react";

const MenuIcons = ({ Icon, background, onOpen }) => {
  return (
    <Badge
      background={background}
      onClick={onOpen}
      borderRadius="full"
      width="25px"
      height="25px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="all .2s ease"
      _hover={{
        cursor: "pointer",
        width: "28px",
        heigth: "28px",
      }}
    >
      <Icon
        color="white"
        fontSize="1.3rem"
        // fontSize={{ base: "0.8rem", md: "1.5rem" }}
      />
    </Badge>
  );
};

MenuIcons.propTypes = {
  Icon: PropTypes.node,
  background: PropTypes.string,
  onOpen: PropTypes.bool,
};

export default MenuIcons;
