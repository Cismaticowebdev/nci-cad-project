import { useState } from "react";

function PostArticleForm({ postArticle }) {
  const [articleToPost, setArticleToPost] = useState({
    title: "",
    body: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    postArticle(articleToPost);
    setArticleToPost({ title: "", body: "" });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArticleToPost({ ...articleToPost, [name]: value });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title to post: </label>
      <input
        id="title"
        type="text"
        name="title"
        value={articleToPost.title}
        onChange={handleInputChange}
      />
      <label htmlFor="body">Body to post: </label>
      <input
        id="body"
        type="text"
        name="body"
        value={articleToPost.body}
        onChange={handleInputChange}
      />
      <button type="submit">Post</button>
    </form>
  );
}

export default PostArticleForm;
