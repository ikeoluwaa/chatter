import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Icon } from "semantic-ui-react";
import { useAppSelector } from "../../app/store/store";
import { FieldValues, useForm } from "react-hook-form";
import { AppFeed } from "../../app/types/feeds";
import { toast } from "react-toastify";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { actions } from "./feedSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default function PostForm() {
  const { loadDocument, create, update } = useFireStore("posts");
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm({
    mode: "onTouched",
    defaultValues: async () => {
      if (post) return { ...post, date: new Date(post.date) };
    },
  });

  const { id } = useParams();

  const post = useAppSelector((state) =>
    state.posts.data.find((e) => e.id === id)
  );
  const { status } = useAppSelector((state) => state.posts);
  const navigate = useNavigate();

  const [showMediaButtons, setShowMediaButtons] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadDocument(id, actions);
  }, [id, loadDocument]);

  async function editPost(data: AppFeed) {
    if (!post) return;
    await update(data.id, { ...data });
  }

  async function createPost(data: FieldValues) {
    const currentDate = new Date().toISOString();
    const ref = await create({ ...data, date: currentDate });
    return ref;
  }

  async function handlePostSubmit(data: FieldValues) {
    try {
      if (post) {
        await editPost({ ...post, ...data });
        navigate(`/posts/${post.id}`);
      } else {
        const ref = await createPost(data);
        navigate(`/posts/${ref?.id}`);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.log(error.message);
    }
  }

  const toggleMediaButtons = () => {
    setShowMediaButtons(!showMediaButtons);
  };

  // const handleAddMedia = (mediaType) => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = mediaType === "picture" ? "image/*" : "video/*";
  //   input.onchange = (e) => handleFileChange(e.target.files[0], mediaType);
  //   input.click();
  // };

  // const handleFileChange = (file, mediaType) => {
  //   console.log(`File selected: ${file.name}`);
  //   setValues({ ...values, selectedFile: file });
  //   setShowMediaButtons(false);
  // };

  if (status === "loading") return <LoadingComponent />;
  return (
    <div className="post-form-container">
      <Form onSubmit={handleSubmit(handlePostSubmit)} className="post-form">
        <input
          type="hidden"
          defaultValue={post?.date || ""}
          {...register("date")}
        />
        <Button
          as={Link}
          to="/feeds"
          className="media-button"
          disabled={isSubmitting}
          content=" Cancel"
        />

        <div className="form-content">
          <Button
            disabled={!isValid || !isDirty}
            loading={isSubmitting}
            type="submit"
            className="publish-button"
            floated="right"
          >
            Publish
          </Button>

          {post?.selectedFile && (
            <div className="selected-image-container">
              <img
                // src={URL.createObjectURL(post?.selectedFile)}
                alt="Selected Image"
                className="selected-image"
              />
            </div>
          )}

          <div className="text-area-div">
            <div className="button-group">
              <Button
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
                  <div className="media-button-group">
                    <Button
                      className="media-button"
                      // onClick={() => handleAddMedia("picture")}
                    >
                      p
                    </Button>
                    <Button
                      className="media-button"
                      // onClick={() => handleAddMedia("video")}
                    >
                      v
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="text-area-inputs">
              <Form.Input
                className="input-field"
                type="text"
                placeholder={showMediaButtons ? "" : "Title"}
                defaultValue={post?.title || ""}
                {...register("title")}
              />
              <Form.TextArea
                className="textarea-field"
                placeholder={showMediaButtons ? "" : "Write your blog..."}
                defaultValue={post?.content || ""}
                {...register("content", { required: true })}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
