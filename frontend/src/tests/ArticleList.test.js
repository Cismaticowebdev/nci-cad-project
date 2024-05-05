import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ArticleList from "../components/ArticleList";

describe("ArticleList component", () => {
  const articles = [
    {
      id: 1,
      title: "Test article title 1",
      body: "Test article body 1.",
      published: true,
    },
    {
      id: 2,
      title: "Test article title 2",
      body: "Test article body 2.",
      published: false,
    },
  ];

  it("renders correctly with articles", () => {
    const { getByText } = render(
      <ArticleList articles={articles} onDelete={() => {}} />
    );

    articles.forEach((article) => {
      expect(getByText(article.title)).toBeInTheDocument();
      expect(getByText(`Article ID: ${article.id}`)).toBeInTheDocument();
      expect(getByText(article.body)).toBeInTheDocument();
      const publishedText = article.published ? "Yes" : "No";
      expect(getByText(`Published: ${publishedText}`)).toBeInTheDocument();
    });
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDeleteMock = jest.fn();
    const { queryAllByText } = render(
      <ArticleList articles={articles} onDelete={onDeleteMock} />
    );

    const deleteButtons = queryAllByText("Delete");
    deleteButtons.forEach((button) => {
      fireEvent.click(button);
    });

    expect(onDeleteMock).toHaveBeenCalledTimes(articles.length);
    articles.forEach((article) => {
      expect(onDeleteMock).toHaveBeenCalledWith(article.id);
    });
  });
});
