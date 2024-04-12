export const createNewPost = (post) => {
  const jsonPost = localStorage.getItem("users_posts");

  if (!jsonPost) {
    const newArray = new Array([post]);

    localStorage.setItem("users_posts", JSON.stringify(newArray));
    return;
  }
  let letNewData = JSON.parse(jsonPost);
  letNewData.push(post);
  localStorage.setItem("users_posts", JSON.stringify(letNewData));
};
export const eraseData = () => {
  localStorage.setItem("users_posts", "");
};
export const getPosts = () => {
  const jsonPost = localStorage.getItem("users_posts");

  if (!jsonPost) return null;
  return JSON.parse(jsonPost);
};
