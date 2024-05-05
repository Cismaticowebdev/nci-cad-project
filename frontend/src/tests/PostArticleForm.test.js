import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PostArticleForm from "../components/PostArticleForm";

describe("PostArticleForm component", () => {
  it("submits the form with correct values", () => {
    const postArticleMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <PostArticleForm postArticle={postArticleMock} />
    );

    fireEvent.change(getByLabelText("Title to post:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText("Body to post:"), {
      target: { value: "Test Body" },
    });
    fireEvent.click(getByLabelText("Published:"));

    fireEvent.click(getByText("Post"));

    expect(postArticleMock).toHaveBeenCalledWith({
      title: "Test Title",
      body: "Test Body",
      published: true,
    });
  });

  it("clears the form after submission", () => {
    const postArticleMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <PostArticleForm postArticle={postArticleMock} />
    );

    fireEvent.change(getByLabelText("Title to post:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText("Body to post:"), {
      target: { value: "Test Body" },
    });
    fireEvent.click(getByLabelText("Published:"));

    fireEvent.click(getByText("Post"));

    expect(getByLabelText("Title to post:").value).toBe("");
    expect(getByLabelText("Body to post:").value).toBe("");
    expect(getByLabelText("Published:").checked).toBe(false);
  });
});
