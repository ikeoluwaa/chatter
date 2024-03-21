import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostForm from "../../components/feeds/PostForm.";

// Mocking react-router-dom's useNavigate and useParams hooks
import { useNavigate } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocking useAppSelector hook
import { useAppSelector } from "../../app/store/store";
jest.mock("../../app/store/store");

// Mocking useFireStore hook
import { useFireStore } from "../../app/hooks/firestore/useFirestore";

// Importing custom matchers
import "@testing-library/jest-dom/extend-expect";

describe("PostForm", () => {
  beforeEach(() => {
    // Clear the mock implementation before each test
    (useAppSelector as jest.Mock).mockClear();
  });

  test("renders form fields and buttons", async () => {
    // Mocking currentUser data
    (useAppSelector as jest.Mock).mockReturnValue({
      currentUser: {
        uid: "userId",
        displayName: "Test User",
        photoURL: "test.jpg",
      },
    });

    render(
      <MemoryRouter>
        <PostForm />
      </MemoryRouter>
    );

    // Logging the HTML structure to debug
    console.log(screen.debug());

    // Asserting that form fields and buttons are rendered
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Write a post......")
    ).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Publish")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    (useAppSelector as jest.Mock).mockReturnValue({
      currentUser: {
        uid: "userId",
        displayName: "Test User",
        photoURL: "test.jpg",
      },
    });

    const createMock = jest.fn().mockResolvedValue({ id: "newPostId" });
    const loadDocumentMock = jest.fn(); // Mock for loadDocument function

    // Mocking useFireStore hook with mock implementation
    (useFireStore as jest.Mock).mockReturnValue({
      loadDocument: loadDocumentMock, // Include loadDocument mock in the returned object
      create: createMock,
      update: jest.fn(),
    });

    render(
      <MemoryRouter>
        <PostForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Write a post......"), {
      target: { value: "Test Content" },
    });

    fireEvent.click(screen.getByText("Publish"));

    // Logging the HTML structure to debug
    console.log(screen.debug());

    await waitFor(() => {
      // Asserting that the create function is called with the expected data
      expect(createMock).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content",
        authorUid: "userId",
        author: "Test User",
        authorPhotoURL: "test.jpg",
        views: [
          { id: "userId", displayName: "Test User", photoURL: "test.jpg" },
        ],
        likedBYIds: ["userId"],
        viewedByIds: ["userId"],
        bookmarkedIds: ["userId"],
        date: expect.any(String),
        postPhotoURL: null,
        postVideoURL: null,
      });
    });

    // Asserting that useNavigate is called with the expected URL
    expect(useNavigate).toHaveBeenCalledWith("/posts/newPostId");
  });
});
