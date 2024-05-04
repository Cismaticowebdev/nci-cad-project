import axios from "axios";
import { useState } from "react";
import ArticleList from "../components/ArticleList";
import PostArticleForm from "../components/PostArticleForm";
import UpdateArticleForm from "../components/UpdateArticleForm";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  async function getArticles() {
    try {
      const response = await axios.get("http://localhost:3000/articles", {
        headers: {
          Accept: "application/json",
        },
      });
      setArticles(response.data);
      console.log(response);
      console.log("Get articles");
    } catch (error) {
      console.error("Error getting articles from server");
      setError("Error getting articles from server");
    }
  }

  async function postArticle(articleToPost) {
    try {
      const response = await axios.post(
        "http://localhost:3000/articles",
        articleToPost,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setArticles([...articles, response.data]);
      console.log("Article posted successfully");
    } catch (error) {
      console.error("Error posting article");
      setError(
        "Error posting article. Check that title and body are not empty"
      );
    }
  }

  async function deleteArticle(articleId) {
    try {
      const response = await axios.delete(
        `http://localhost:3000/articles/${articleId}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setArticles(articles.filter((article) => article.id !== articleId));
      console.log("Article deleted successfully");
    } catch (error) {
      console.error("Error deleting article from server");
      setError("Error deleting article from server");
    }
  }

  async function updateArticle(articleId, articleToUpdate) {
    try {
      const response = await axios.put(
        `http://localhost:3000/articles/${articleId}`,
        articleToUpdate,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const updatedArticle = response.data;
      setArticles(
        articles.map((article) => {
          if (article.id === updatedArticle.id) {
            return updatedArticle;
          }
          return article;
        })
      );
      console.log("Article updated successfully");
    } catch (error) {
      console.error("Error updating article");
      setError(
        "Error updating article. Check that article ID is valid and title and body are included"
      );
    }
  }

  return (
    <div>
      <h1>Articles</h1>
      <p>{error}</p>
      <button onClick={getArticles}>Get</button>
      <PostArticleForm postArticle={postArticle} />
      <UpdateArticleForm updateArticle={updateArticle} />
      <ArticleList articles={articles} onDelete={deleteArticle} />
    </div>
  );
}

export default Articles;
