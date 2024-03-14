import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Form } from "react-router-dom";
import { Icon, Label, Button, Divider, FormInput } from "semantic-ui-react";
import { closeModal } from "../../app/common/modals/modalSlice";
import { auth } from "../../app/config/firebase";
import { useAppSelector, useAppDispatch } from "../../app/store/store";
import SocialLogin from "./SocialLogin";

export default function SignUpLoginForm() {
  const navigate = useNavigate();
  const { data: location } = useAppSelector((state) => state.modals);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = useForm({ mode: "onTouched" });

  const dispatch = useAppDispatch();

  async function onSubmit(data: FieldValues) {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      dispatch(closeModal());
      navigate(location.from);
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <div
      className="signup-login-form"
      style={{
        border: "none",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        height: "30rem",
      }}
    >
      <h1
        style={{
          fontSize: "1.6rem",
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Welcome Back
      </h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          fluid
          label={<div style={{ marginBottom: "0.8rem" }}>Email address</div>}
          defaultValue=""
          placeholder="Email address"
          {...register("email", {
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
          error={
            (errors.email?.type === "required" && "Email is required") ||
            (errors.email?.type === "pattern" && "Email is invalid")
          }
        />

        <FormInput
          fluid
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={() => setShowPassword(!showPassword)}
            />
          }
          type={showPassword ? "text" : "password"}
          defaultValue=""
          label={<div style={{ marginBottom: "0.8rem" }}>Password</div>}
          placeholder="Password"
          {...register("password", { required: true })}
          error={errors.password && "Password is required"}
        />

        {errors.root && (
          <Label
            basic
            color="red"
            style={{ display: "block", marginBottom: 10 }}
            content={errors.root.serverError.message}
          />
        )}

        <Button
          style={{
            color: "#fff",
            backgroundColor: "#543EE0",
            marginTop: "1rem",
          }}
          loading={isSubmitting}
          disabled={!isValid || !isDirty || isSubmitting}
          type="submit"
          fluid
          size="large"
          content="Login"
        />
        <Divider horizontal>or</Divider>
        <SocialLogin />
      </Form>
    </div>
  );
}
