import { Container, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { eraseData, getPosts } from "../../componects/config/handlePost";
import Header from "../../componects/Header";
import PostWarapper from "../../componects/layout/PostWarapper";
import { UseAuth } from "../../context/UseAuth";

const Home = () => {
  const Toast = useToast();
  const { fecthAgain, setFecthAgain } = UseAuth(false);
  const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;

  const savePost = async (post) => {
    try {
      await PostService.savePost(post);
    } catch (error) {
      Toast({
        description: error.message,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };
  const posts = getPosts();
  useEffect(() => {
    console.log(posts);
    console.log(getOnLineStatus());
    if (getOnLineStatus() && posts) {
      const promisses = posts.map(async (post) => {
        await savePost(post);
      });
      Promise.all(promisses)
        .then(() => {
          Toast({
            description: "Posts Enviados",
            status: "success",
            isClosable: true,
            position: "top",
          });
          eraseData(); // apaga todos os post do local storag
        })
        .catch((err) => {
          Toast({
            description: err.message,
            status: "error",
            isClosable: true,
            position: "top",
          });
        });
    }
  }, [fecthAgain]);
  return (
    <Container
      minW="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      gap={{ base: "0", md: "30px" }}
      // justifyContent="center"
      p={0}
      minH="100dvh"
      background="#f7f7f8"
    >
      <header style={{ width: "100%", padding: 0 }}>
        <Header />
      </header>
      <main>
        <PostWarapper />
      </main>
    </Container>
  );
};

export default Home;
