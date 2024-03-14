import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate, Form } from "react-router-dom";
import {
  Header,
  FormGroup,
  FormSelect,
  Label,
  Button,
  FormInput,
} from "semantic-ui-react";
import { closeModal } from "../../app/common/modals/modalSlice";
import { auth } from "../../app/config/firebase";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector, useAppDispatch } from "../../app/store/store";
import { signIn } from "./authSlice";

export default function SignUpRegisterForm() {
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
      navigate(location.from);
    } catch (error: any) {
      setError("root.serverError", {
        type: "400",
        message: error.message,
      });
    }
  }

  return (
    <div style={{ height: "30rem" }}>
      <Header content="Register to Chatter" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup widths="equal">
          <FormInput
            fluid
            defaultValue=""
            label="First name"
            placeholder="First Name"
            {...register("firstName", { required: true })}
            error={errors.displayName && "First name is required"}
          />
          <FormInput
            fluid
            defaultValue=""
            label="Last name"
            placeholder="Last Name"
            {...register("lastName", { required: true })}
            error={errors.displayName && "Last name is required"}
          />
        </FormGroup>
        <FormInput
          fluid
          defaultValue=""
          label="Display Name"
          placeholder="Display Name"
          {...register("displayName", { required: true })} // Changed to displayName
          error={errors.displayName && "Display name is required"}
        />
        <FormSelect
          fluid
          label="You are joining as?"
          options={options}
          onChange={(_e, { value }) => setSelectedRole(value as string)}
        />
        <FormInput
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
        <FormInput
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
        <FormInput
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
    </div>
  );
}
