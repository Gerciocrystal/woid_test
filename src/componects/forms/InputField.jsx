import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const InputField = ({
  name,
  title,
  type,
  register,
  error,
  placeholder,
  required,
  border,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <FormControl isInvalid={error}>
      <FormLabel>{title}</FormLabel>
      {type !== "textarea" ? (
        <Input
          height="47px"
          minW="220px"
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: required ? "Campo Necessario" : false,
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          transition="background-color 0.3s, border-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
          _hover={{
            bg: isHovered ? "gray.100" : "white",
            transform: "scale(1.01)",
            boxShadow: "base",
          }}
          _focus={{ borderColor: isFocused ? "blue.400" : "gray.300" }}
        />
      ) : (
        <Textarea
          minW="220px"
          minH="220px"
          type={type}
          placeholder={placeholder}
          {...register(name, {
            required: required ? "Campo Necessario" : false,
          })}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          transition="background-color 0.3s, border-color 0.3s, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
          _hover={{
            bg: isHovered ? "gray.100" : "white",
            transform: "scale(1.01)",
            boxShadow: "base",
          }}
          _focus={{ borderColor: isFocused ? "blue.400" : "gray.300" }}
        ></Textarea>
      )}
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
};

InputField.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.object,
  error: PropTypes.object,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  border: PropTypes.string,
};
InputField.defaultProps = {
  border: null,
};

export default InputField;
