import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { useState } from "react";
import ProfileForm from "./ProfileForm";
import { auth } from "../../app/config/firebase";
import { Profile } from "../../app/types/profile";

type Props = {
  profile: Profile;
};

export default function ProfileAbout({ profile }: Props) {
  const [editMode, setEditMode] = useState(false);
  const isCurrentUser = auth.currentUser?.uid === profile.id;

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={`About ${profile.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated="right"
              basic
              content={editMode ? "cancel" : "Edit profile"}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <ProfileForm profile={profile} setEditMode={setEditMode} />
          ) : (
            <>
              <div style={{ marginBottom: 10 }}>
                <p>
                  <strong>
                    Name:{profile.firstName} {profile.lastName}
                  </strong>
                </p>
                <strong>Member since:{profile.createdAt}</strong>
                <div style={{ marginTop: 10 }}>{profile.description}</div>
              </div>
            </>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}
