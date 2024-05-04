import { useState } from "react";

function UpdateArticleForm({ updateArticle }) {
  const [articleId, setArticleId] = useState("");
  const [articleToUpdate, setArticleToUpdate] = useState({
    title: "",
    body: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    updateArticle(articleId, articleToUpdate);
    setArticleToUpdate({ title: "", body: "" });
    setArticleId("");
  }

  function handleIdChange(event) {
    setArticleId(event.target.value);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArticleToUpdate({ ...articleToUpdate, [name]: value });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">Article ID: </label>
      <input id="id" type="text" value={articleId} onChange={handleIdChange} />
      <label htmlFor="title">Title to update: </label>
      <input
        id="title"
        type="text"
        name="title"
        value={articleToUpdate.title}
        onChange={handleInputChange}
      />
      <label htmlFor="body">Body to update: </label>
      <input
        id="body"
        type="text"
        name="body"
        value={articleToUpdate.body}
        onChange={handleInputChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateArticleForm;
