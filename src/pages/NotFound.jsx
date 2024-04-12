import { Button, Container, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import background from "../assets/images/404.png";

const NotFound = () => {
  return (
    <Container
      display="flex"
      minW="100%"
      centerContent
      alignContent="center"
      height="100dvh"
      flexDir="column"
    >
      <Image src={background} boxSize={{ base: "320px", md: "520px" }} />
      <Text>Oops! página não encontrada</Text>
      <Button colorScheme="blue">
        <Link to="/"> Voltar</Link>
      </Button>
    </Container>
  );
};
export default NotFound;
