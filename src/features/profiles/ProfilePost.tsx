import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, Header } from "semantic-ui-react";
import { Profile } from "../../app/types/profile";
import { useFireStore } from "../../app/hooks/firestore/useFirestore";
import { useAppSelector } from "../../app/store/store";
import { CollectionOptions } from "../../app/hooks/firestore/types";
import { actions } from "./profileSlice";

type Props = {
  profile: Profile;
};

export default function ProfileEvents({ profile }: Props) {
  const { loadCollection } = useFireStore("events");
  const { data: posts } = useAppSelector((state) => state.posts);

  // Set initial query options to filter posts by authorId
  const initialOptions: CollectionOptions = {
    queries: [
      { attribute: "authorId", operator: "==", value: profile.id },
      { attribute: "date", operator: ">=", value: new Date() },
    ],
    sort: { attribute: "date", order: "asc" },
    reset: true,
  };

  // Load posts based on the initial query options
  useEffect(() => {
    loadCollection(actions, initialOptions);
  }, [loadCollection, profile.id]); // Make sure to include profile.id in the dependency array

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header floated="left" icon="calendar" content="events" />
      </Grid.Column>
      <Grid.Column width={16}>
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: 10 }}>
          {posts.map((post) => (
            <div key={post.id} style={{ width: "25%", padding: 10 }}>
              <div>
                <Link to={`/posts/${post.id}`}>
                  <h3>{post.title}</h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Grid.Column>
    </Grid>
  );
}
