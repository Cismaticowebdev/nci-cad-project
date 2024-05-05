import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UpdateArticleForm from "../components/UpdateArticleForm";

describe("UpdateArticleForm component", () => {
  it("submits the form with correct values", () => {
    const updateArticleMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <UpdateArticleForm updateArticle={updateArticleMock} />
    );

    fireEvent.change(getByLabelText("Article ID:"), { target: { value: "1" } });
    fireEvent.change(getByLabelText("Title to update:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText("Body to update:"), {
      target: { value: "Test Body" },
    });
    fireEvent.click(getByLabelText("Published:"));

    fireEvent.click(getByText("Update"));

    expect(updateArticleMock).toHaveBeenCalledWith("1", {
      title: "Test Title",
      body: "Test Body",
      published: true,
    });
  });

  it("clears the form after submission", () => {
    const updateArticleMock = jest.fn();
    const { getByLabelText, getByText } = render(
      <UpdateArticleForm updateArticle={updateArticleMock} />
    );

    fireEvent.change(getByLabelText("Article ID:"), { target: { value: "1" } });
    fireEvent.change(getByLabelText("Title to update:"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(getByLabelText("Body to update:"), {
      target: { value: "Test Body" },
    });
    fireEvent.click(getByLabelText("Published:"));

    fireEvent.click(getByText("Update"));

    expect(getByLabelText("Article ID:").value).toBe("");
    expect(getByLabelText("Title to update:").value).toBe("");
    expect(getByLabelText("Body to update:").value).toBe("");
    expect(getByLabelText("Published:").checked).toBe(false);
  });
});
