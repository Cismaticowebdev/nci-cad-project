import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Article from "../components/Article";

describe("Article component", () => {
  const article = {
    id: 1,
    title: "Test Article",
    body: "This is a test article.",
    published: true,
    onDelete: jest.fn(),
  };

  it("renders correctly", () => {
    const { getByText } = render(<Article {...article} />);

    expect(getByText(article.title)).toBeInTheDocument();
    expect(getByText(`Article ID: ${article.id}`)).toBeInTheDocument();
    expect(getByText(article.body)).toBeInTheDocument();
    expect(getByText("Published: Yes")).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const { getByText } = render(<Article {...article} />);
    fireEvent.click(getByText("Delete"));

    expect(article.onDelete).toHaveBeenCalled();
  });
});
