import { useState } from "react";

function UpdateArticleForm({ updateArticle }) {
  const [articleId, setArticleId] = useState("");
  const [articleToUpdate, setArticleToUpdate] = useState({
    title: "",
    body: "",
    published: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    updateArticle(articleId, articleToUpdate);
    setArticleToUpdate({ title: "", body: "", published: false });
    setArticleId("");
  }

  function handleIdChange(event) {
    setArticleId(event.target.value);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setArticleToUpdate({ ...articleToUpdate, [name]: value });
  }

  function handleCheckboxChange(event) {
    const { name, checked } = event.target;
    setArticleToUpdate({ ...articleToUpdate, [name]: checked });
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
      <label htmlFor="published">Published: </label>
      <input
        id="published"
        type="checkbox"
        name="published"
        checked={articleToUpdate.published}
        onChange={handleCheckboxChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateArticleForm;
