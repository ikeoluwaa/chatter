import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Divider, Form, Icon, Segment } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { FieldValues, useForm } from "react-hook-form";
import { AppFeed } from "../../app/types/feeds";
import { toast } from "react-toastify";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./feedSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { arrayUnion } from "firebase/firestore";

export default function PostForm() {
  const { loadDocument, create, update } = useFireStore("posts");
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm({
    mode: "onTouched",
  });

  const { id } = useParams();

  const post = useAppSelector((state) =>
    state.posts.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.posts);
  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const pictureInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  async function editPost(data: AppFeed) {
    if (!post) return;
    await update(data.id, { ...data });
  }

  async function createPost(data: FieldValues) {
    if (!currentUser) return;
    const currentDate = new Date().toISOString();

    const documentRef = await create({
      ...data,
      imageUrl,
      videoUrl,
      authorUid: currentUser.uid,
      author: currentUser.displayName,
      authorPhotoURL: currentUser.photoURL,
      likes: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      views: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      likedBYIds: currentUser.uid,
      ViewedById: currentUser.uid,
      date: currentDate,
    });

    return documentRef;
  }

  async function handlePostSubmit(data: FieldValues) {
    try {
      if (post) {
        await editPost({ ...post, ...data });
        navigate(`/posts/${post.id}`);
      } else {
        const documentRef = await createPost(data);
        navigate(`/posts/${documentRef?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const handlePictureInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload file to cloud storage
      // Example:
      // const imageUrl = await uploadFileToStorage(file);
      // setImageUrl(imageUrl);
    }
  };

  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Upload file to cloud storage
      // Example:
      // const videoUrl = await uploadFileToStorage(file);
      // setVideoUrl(videoUrl);
    }
  };

  if (status === "loading") return <LoadingComponent />;
  return (
    <Segment>
      <Form onSubmit={handleSubmit(handlePostSubmit)}>
        {/* Input fields and other form elements */}
        {/* Handle picture and video input changes */}
        <input
          type="file"
          accept="image/*"
          onChange={handlePictureInputChange}
        />
        <input type="file" accept="video/*" onChange={handleVideoInputChange} />
        <Button disabled={isSubmitting} type="submit">
          Submit
        </Button>
      </Form>
    </Segment>
  );
}
