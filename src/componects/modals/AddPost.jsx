import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import PostService from "../../services/PostService";
import { createNewPost } from "../config/handlePost";
const AddPost = ({ isOpen, onClose, type }) => {
  const [loading, setLoading] = useState();
  const Toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const savePost = async (data) => {
    setLoading(true);
    const schema = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      const response = await PostService.savePost(schema);
      console.log(response);
      Toast({
        description: "Post Enviado com sucesso",
        status: "success",
        position: "top",
      });
    } catch (error) {
      if (!error) {
        Toast({
          description: error.message,
          status: "error",
          position: "top",
          isClosable: true,
        });
      } else {
        createNewPost(schema);
        Toast({
          title: "Post Salvo",
          description: "Conecte-se a internet para ter o seu post Enviado",
          status: "warning",
          position: "top",
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };
  let user = localStorage.getItem("user_post");
  useEffect(() => {
    user = localStorage.getItem("user_post");
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(savePost)}>
          <ModalCloseButton />
          <ModalHeader>
            <Text fontSize="xl">Novo Post</Text>
            <Text fontSize="sm" color="#9B9B9B">
              se comunique com o mundo apartir daqui
            </Text>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <Box display="flex" flexDir="column" gap={2}>
              {!user && (
                <InputField
                  register={register}
                  name="author"
                  error={errors.author}
                  title="Nome"
                  placeholder="eggs: Jonas Baptista"
                  required={true}
                />
              )}
              <InputField
                title="Titulo"
                register={register}
                name="title"
                error={errors.title}
                required="true"
                placeholder="eggs: O Problema da fome em Moçambique"
              />
              <InputField
                title="Descrição"
                register={register}
                name="description"
                type="textarea"
                error={errors.description}
                required="true"
                placeholder="eggs: A fome pode ser caracterizada pela falta ...."
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <Button colorScheme="blue" isLoading={loading} type="submit">
                Enviar
              </Button>
              <Button>Fechar</Button>
            </HStack>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

AddPost.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  type: PropTypes.string,
};

export default AddPost;
