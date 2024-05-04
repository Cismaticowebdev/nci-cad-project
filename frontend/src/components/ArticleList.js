import Article from "./Article";

function ArticleList({ articles, onDelete }) {
  return (
    <section>
      {articles &&
        articles.map((article) => {
          return (
            <Article
              key={article.id}
              title={article.title}
              id={article.id}
              body={article.body}
              onDelete={() => onDelete(article.id)}
            />
          );
        })}
    </section>
  );
}

export default ArticleList;
