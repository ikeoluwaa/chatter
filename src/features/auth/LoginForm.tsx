import { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  GridColumn,
  Header,
  Icon,
  Label,
} from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { closeModal } from "../../app/common/modals/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import SocialLogin from "./SocialLogin";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
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
    <ModalWrapper
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "0",
      }}
      contentStyle={{ background: "none", padding: "0", margin: "0" }}
    >
      <Grid style={{ background: "transparent", margin: "0" }}>
        <GridColumn
          computer={6}
          tablet={12}
          mobile={16}
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/signin.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="signup-form-texts"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "2rem",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "2rem",
                textAlign: "center",
                marginBottom: "1.6rem",
              }}
            >
              CHATTER
            </h1>
            <p style={{ color: "white", lineHeight: "1.5" }}>
              Unleash the Power of Words, Connect with Like-minded Readers and
              Writers
            </p>
          </div>
        </GridColumn>

        <GridColumn
          computer={10}
          tablet={12}
          mobile={16}
          style={{ background: "white", padding: "3rem" }}
        >
          <Header content="Welcome back" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Input
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
            <Form.Input
              icon={
                <Icon
                  name={showPassword ? "eye slash" : "eye"}
                  link
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
              type={showPassword ? "text" : "password"}
              defaultValue=""
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
              style={{ color: "#fff", backgroundColor: "#543EE0" }}
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
        </GridColumn>
      </Grid>
    </ModalWrapper>
  );
}
