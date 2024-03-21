import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormSelect,
  Grid,
  GridColumn,
  Header,
  Label,
} from "semantic-ui-react";
import ModalWrapper from "../../app/common/modals/ModalWrapper";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/store";
import { closeModal, openModal } from "../../app/common/modals/modalSlice";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { signIn } from "./authSlice";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ModalManager from "../../app/common/modals/ModalManager";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { data: location } = useAppSelector((state) => state.modals);

  const [selectedRole, setSelectedRole] = useState<string>("reader");
  const { set } = useFireStore("profiles");
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isValid, isDirty, errors },
    watch,
  } = useForm({ mode: "onTouched" });

  const dispatch = useAppDispatch();
  const options = [
    { key: "reader", text: "Reader", value: "reader" },
    { key: "writer", text: "Writer", value: "writer" },
  ];

  const password1 = watch("password1");

  async function onSubmit(data: FieldValues) {
    try {
      const userCreds = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password1
      );

      if (userCreds.user) {
        await sendEmailVerification(userCreds.user);

        await updateProfile(userCreds.user, {
          displayName: data.displayName,
        });
        await set(userCreds.user.uid, {
          firstName: data.firstName,
          lastName: data.lastName,
          displayName: data.displayName,
          email: data.email,
          role: selectedRole,
          createdAt: Timestamp.now(),
        });
        dispatch(signIn(userCreds.user));
        dispatch(closeModal());
        dispatch(openModal({ type: "ConfirmationMessage" }));
        navigate(location.from);
      } else {
        throw new Error("User not found after sign up");
      }
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <>
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
            className="signup-background-img"
            computer={7}
            tablet={6}
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
            style={{ padding: "3rem", height: "auto" }}
            computer={9}
            tablet={10}
            mobile={16}
          >
            <Header content="Register to Chatter" />
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup widths="equal">
                <Form.Input
                  fluid
                  defaultValue=""
                  label="First name"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  error={errors.displayName && "First name is required"}
                />
                <Form.Input
                  fluid
                  defaultValue=""
                  label="Last name"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  error={errors.displayName && "Last name is required"}
                />
              </FormGroup>
              <Form.Input
                fluid
                defaultValue=""
                label="Display Name"
                placeholder="Display Name"
                {...register("displayName", { required: true })}
                error={errors.displayName && "Display name is required"}
              />
              <FormSelect
                fluid
                label="You are joining as?"
                options={options}
                onChange={(_e, { value }) => setSelectedRole(value as string)}
              />
              <Form.Input
                defaultValue=""
                label="Email"
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
                icon={{
                  name: "eye",
                  link: true,
                  onClick: (event: any) => {
                    const passwordInput =
                      event.target.parentNode.querySelector("input");
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                    } else {
                      passwordInput.type = "password";
                    }
                  },
                }}
                type="password"
                defaultValue=""
                label="Password"
                placeholder="Password"
                {...register("password1", { required: true })}
                error={errors.password && "Password is required"}
              />
              <Form.Input
                icon={{
                  name: "eye",
                  link: true,
                  onClick: (event: any) => {
                    const passwordInput =
                      event.target.parentNode.querySelector("input");
                    if (passwordInput.type === "password") {
                      passwordInput.type = "text";
                    } else {
                      passwordInput.type = "password";
                    }
                  },
                }}
                type="password"
                defaultValue=""
                label="Confirm Password"
                placeholder="Confirm Password"
                {...register("password2", {
                  required: true,
                  validate: {
                    passwordMatch: (value) =>
                      value === password1 || "Passwords do not match",
                  },
                })}
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
                content="Create account"
              />
            </Form>
          </GridColumn>
        </Grid>
      </ModalWrapper>
    </>
  );
}
