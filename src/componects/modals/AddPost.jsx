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
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import InputField from "../forms/InputField";
import PostService from "../../services/PostService";
import FileBase from "react-file-base64";
import { createNewPost } from "../config/handlePost";
import { UseAuth } from "../../context/UseAuth";
const AddPost = ({ isOpen, onClose, type }) => {
  const [loading, setLoading] = useState();
  const Toast = useToast();
  const [base64File, setBase64File] = useState("");
  const { setFecthAgain, fetchAgain, setNewPost } = UseAuth();
  const [errorState, setErrorState] = useState({
    photo: false,
  });
  const handleImageChange = (base64) => {
    if (!base64.type.startsWith("image/")) {
      setErrorState({
        ...errorState,
        photo: true,
        message: "Arquivo Inválido",
      });
      Toast({
        description: "Somente Imagens",
        isClosable: true,
        position: "top",
        status: "error",
        duration: 5000,
      });
      return;
    }
    setBase64File(base64.base64);
    setErrorState({ ...errorState, photo: false });
    // Armazene a string base64 da imagem em um estado ou envie para o backend
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const savePost = async (data) => {
    setLoading(true);
    if (type == "photo" && !base64File) {
      setErrorState({
        ...errorState,
        photo: true,
      });
      return;
    }
    const schema = {
      ...data,
      type,
      image: base64File,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    try {
      await PostService.savePost(schema);
      Toast({
        description: "Post Enviado com sucesso",
        status: "success",
        position: "top",
        isClosable: true,
      });
      onClose();
      reset();
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
        setNewPost(schema);
        Toast({
          title: "Post Salvo",
          description: "Conecte-se a internet para ter o seu post Enviado",
          status: "warning",
          position: "top",
          isClosable: true,
        });
        onClose();
        reset();
      }
    } finally {
      setLoading(false);
      setFecthAgain(!fetchAgain);
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
              {type == "photo" ? (
                <InputField
                  title="Descreva a situação"
                  register={register}
                  name="title"
                  error={errors.title}
                  required="true"
                  placeholder="eggs: Numa praia com os meus amigos mateo e "
                />
              ) : (
                <InputField
                  title="Descrição"
                  register={register}
                  name="description"
                  type="textarea"
                  error={errors.description}
                  required="true"
                  placeholder="eggs: A fome pode ser caracterizada pela falta ...."
                />
              )}
              {type == "photo" && (
                <FormControl
                  isInvalid={errorState.photo}
                  overflowX="hidden"
                  htmlFor="photo_upload"
                >
                  <FormLabel>Foto</FormLabel>
                  <Box
                    height="320px"
                    border={`1px solid ${errorState.photo ? "red" : "#dff8ff"}`}
                    borderRadius="base"
                    p={2}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FileBase
                      id="photo_upload"
                      type="file"
                      multiple={false} // Defina como false para selecionar apenas uma imagem
                      onDone={handleImageChange}
                    />
                  </Box>
                  <FormErrorMessage>
                    {errorState.photo &&
                      (errorState?.message || "foto obrigatoria")}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <Button colorScheme="blue" isLoading={loading} type="submit">
                Enviar
              </Button>
              <Button onClick={onClose}>Fechar</Button>
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
