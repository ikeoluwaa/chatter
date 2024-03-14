import { FieldValues, useForm } from "react-hook-form";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { Profile } from "../../app/types/profile";
import { updateProfile } from "firebase/auth";
import { auth } from "../../app/config/firebase";
import { Button, Form } from "semantic-ui-react";

type Props = {
  profile: Profile;
  setEditMode: (value: boolean) => void;
};

export default function ProfileForm({ profile, setEditMode }: Props) {
  const { update } = useFireStore("profiles");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      displayName: profile.displayName,
      description: profile.description,
      firstName: profile.firstName,
      lastName: profile.lastName,
    },
  });

  async function onSubmit(data: FieldValues) {
    await update(profile.id, data);
    if (profile.displayName !== profile.displayName) {
      await updateProfile(auth.currentUser!, {
        displayName: data.displayName,
      });
    }
    setEditMode(false);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        placeholder="Display Name"
        {...register("displayName", { required: true })}
        error={errors.displayName && "Display name is Required"}
      />
      <Form.Input
        placeholder="First Name"
        {...register("firstName", { required: true })}
        error={errors.displayName && "First name is Required"}
      />
      <Form.Input
        placeholder="Last Name"
        {...register("lastName", { required: true })}
        error={errors.displayName && "Last name is Required"}
      />

      <Form.TextArea
        placeholder="Tell us about yourself"
        {...register("description")}
      />
      <Button
        loading={isSubmitting}
        disabled={isSubmitting || !isValid || !isDirty}
        floated="right"
        type="submit"
        size="large"
        positive
        content="update profile"
      />
    </Form>
  );
}
