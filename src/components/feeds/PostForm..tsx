import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Divider,
  Form,
  Icon,
  Segment,
  Image,
  TextArea,
} from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { FieldValues, useForm } from "react-hook-form";
import { AppFeed } from "../../app/types/feeds";
import { toast } from "react-toastify";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./feedSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { arrayUnion } from "firebase/firestore";
import { storage } from "../../app/config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function PostForm() {
  const { loadDocument, create, update } = useFireStore("posts");
  const { id } = useParams();

  const post = useAppSelector((state) =>
    state.posts.data.find((e) => e.id === id)
  );

  const { currentUser } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const pictureInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showMediaButtons, setShowMediaButtons] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
    setValue,
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      ...(post && {
        ...post,
        date: post.date ? new Date(post.date) : new Date(),
      }),
    },
  });

  async function editPost(data: AppFeed) {
    if (!post) return;
    await update(data.id, { ...data });
  }

  async function createPost(data: FieldValues) {
    if (!currentUser) return;
    const currentDate = new Date().toISOString();
    const ref = await create({
      ...data,
      authorUid: currentUser.uid,
      author: currentUser.displayName,
      authorPhotoURL: currentUser.photoURL,

      views: arrayUnion({
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      }),
      likedBYIds: arrayUnion(currentUser.uid),
      viewedByIds: arrayUnion(currentUser.uid),
      date: currentDate,
    });

    return ref;
  }

  async function handlePostSubmit(data: FieldValues) {
    try {
      if (post) {
        await editPost({ ...post, ...data });
        navigate(`/posts/${post.id}`);
      } else {
        const ref = await createPost({
          ...data,
          postPhotoURL: selectedImage,
          postVideoURL: selectedVideo,
        });
        navigate(`/posts/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
    console.log(data);
  }

  const toggleMediaButtons = () => {
    setShowMediaButtons(!showMediaButtons);
  };

  const handlePictureSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const storageRef = ref(storage, `${currentUser?.uid}/post_image/${id}`);

        const snapshot = await uploadBytesResumable(storageRef, file);

        const imageUrl = await getDownloadURL(snapshot.ref);

        setSelectedImage(imageUrl);
        setValue("postPhotoURL", imageUrl);

        setShowMediaButtons(false);
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  const handleVideoSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // Create a reference to the storage bucket
        const storageRef = ref(
          storage,
          `${currentUser?.uid}/post_video/${id}/${file.name}`
        );

        // Upload file to Firebase Storage
        const snapshot = await uploadBytesResumable(storageRef, file);

        // Get the download URL of the uploaded video
        const videoUrl = await getDownloadURL(snapshot.ref);

        // Set the selected video URL in state and form value
        setSelectedVideo(videoUrl);
        setValue("postVideoURL", videoUrl);

        // Close the media buttons section
        setShowMediaButtons(false);
      } catch (error) {
        console.error("Error uploading video to Firebase Storage:", error);
        toast.error("Error uploading video. Please try again.");
      }
    }
  };

  if (status === "loading") return <LoadingComponent />;
  return (
    <Segment>
      <Form
        onSubmit={handleSubmit(handlePostSubmit)}
        className="post-form"
        style={{ padding: "2rem", border: "none" }}
      >
        <input
          type="hidden"
          defaultValue={post?.date || new Date().toISOString()} // Use current date if post.date is undefined or falsy
          {...register("date")}
        />
        <Button
          style={{
            backgroundColor: "#543EE0",
            color: "#fff",
          }}
          as={Link}
          to="/feeds"
          className="media-button"
          disabled={isSubmitting}
          content=" Cancel"
        />
        <Button
          style={{
            backgroundColor: "#543EE0",
            color: "#fff",
          }}
          disabled={!isValid || !isDirty}
          loading={isSubmitting}
          type="submit"
          className="publish-button"
          floated="right"
        >
          Publish
        </Button>
        <div className="flex justify-center gap-0 p-2">
          <div
            className="button-group"
            style={{
              display: "flex",
              justifyItems: "center",
              marginTop: "2rem",
            }}
          >
            <Button
              style={{
                width: "4rem",
                height: "4rem",
                backgroundColor: "transparent",
                border: "1px solid black",
                marginTop: "2rem",
              }}
              circular
              type="button"
              icon
              className="media-button"
              onClick={toggleMediaButtons}
            >
              <Icon name={showMediaButtons ? "close" : "plus"} />
            </Button>

            {showMediaButtons && (
              <div className="media-buttons">
                <div className="media-button-group" style={{ display: "flex" }}>
                  <Divider
                    style={{
                      color: "blue",
                      border: "1px solid black",
                      height: "10rem",
                      marginTop: "0",
                    }}
                  />

                  {/* Picture Input */}
                  <Button
                    style={{
                      color: "blue",
                      width: "4rem",
                      height: "4rem",
                      textAlign: "center",
                      marginTop: "2rem",
                    }}
                    circular
                    className="media-button"
                    onClick={() => pictureInputRef.current?.click()}
                  >
                    <Icon name="picture" />
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    {...register("postPhotoURL")}
                    ref={pictureInputRef}
                    onChange={handlePictureSelect}
                  />

                  {/* Video Input */}
                  <Button
                    style={{
                      color: "blue",
                      width: "4rem",
                      height: "4rem",
                      textAlign: "center",
                      marginTop: "2rem",
                    }}
                    circular
                    className="media-button"
                    onClick={() => videoInputRef.current?.click()}
                  >
                    <Icon name="video" />
                  </Button>
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    {...register("postVideoURL")}
                    ref={videoInputRef}
                    onChange={handleVideoSelect}
                  />
                </div>
              </div>
            )}
          </div>
          <div
            className="form-content"
            style={{
              border: "none",
              padding: "2rem",
              transition: "all 0.5s ease-in-out",
              opacity: showMediaButtons ? 0 : 1,
            }}
          >
            <div
              className="text-area-inputs"
              style={{ position: "relative", marginBottom: "1rem" }}
            >
              {selectedImage && (
                <div className="selected-image-container">
                  <Image
                    src={selectedImage}
                    alt="Selected Image"
                    className="selected-image"
                  />
                </div>
              )}
              {selectedVideo && (
                <div className="selected-video-container">
                  <video controls className="selected-video">
                    <source src={selectedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <Form.Input
                style={{ fontSize: "2rem" }}
                className="input-field"
                type="text"
                placeholder="Title"
                defaultValue={post?.title || ""}
                {...register("title", { required: true })}
              />
              <TextArea
                style={{
                  border: "none",
                  minHeight: "10rem",
                  fontSize: "1.8rem",
                }}
                className="textarea-field"
                placeholder="Write a post......"
                defaultValue={post?.content || ""}
                {...register("content", { required: true })}
              />
            </div>
          </div>
        </div>
      </Form>
    </Segment>
  );
}
