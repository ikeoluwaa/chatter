import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Icon } from "semantic-ui-react";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { createPost } from "./feedSlice";
import { createId } from "@paralleldrive/cuid2";
import { FieldValues, useForm } from "react-hook-form";

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isDirty },
  } = useForm();

  let { id } = useParams();

  const post = useAppSelector((state) =>
    state.posts.posts.find((e) => e.id === id)
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues = post ?? {
    title: "",
    content: "",
    selectedFile: null,
  };

  const [values, setValues] = useState(initialValues);
  const [showMediaButtons, setShowMediaButtons] = useState(false);

  function handlePostSubmit(data: FieldValues) {
    console.log(data);
    id = id ?? createId();
    dispatch(createPost({ ...data, id, date: data.date.tostring() }));
    navigate(`/posts/${id}`);
  }

  const toggleMediaButtons = () => {
    setShowMediaButtons(!showMediaButtons);
  };

  const handleAddMedia = (mediaType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = mediaType === "picture" ? "image/*" : "video/*";
    input.onchange = (e) => handleFileChange(e.target.files[0], mediaType);
    input.click();
  };

  const handleFileChange = (file, mediaType) => {
    console.log(`File selected: ${file.name}`);
    setValues({ ...values, selectedFile: file });
    setShowMediaButtons(false);
  };

  return (
    <div className="post-form-container">
      <Form onSubmit={handleSubmit(handlePostSubmit)} className="post-form">
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

          {values.selectedFile && (
            <div className="selected-image-container">
              <img
                src={URL.createObjectURL(values.selectedFile)}
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
                      onClick={() => handleAddMedia("picture")}
                    >
                      p
                    </Button>
                    <Button
                      className="media-button"
                      onClick={() => handleAddMedia("video")}
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
