import {
  Segment,
  Grid,
  Divider,
  Header,
  Icon,
  Button,
} from "semantic-ui-react";
import { openModal } from "../common/modals/modalSlice";
import { useAppDispatch } from "../store/store";
import { useLocation, useNavigate } from "react-router-dom";

export default function UnauthComponent() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/feeds";

  return (
    <Segment
      placeholder
      style={{
        background: "none",
        border: "none",
      }}
    >
      <Grid
        style={{
          background: "none",
          border: "none",
        }}
        columns={2}
        stackable
        textAlign="center"
      >
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign="middle">
          <Grid.Column textAlign="center">
            <Header icon>
              <Icon
                name="lock"
                style={{
                  color: "#543EE0",
                }}
              />
              You need to be signed in to do that
            </Header>
            <br />
            <Button.Group>
              <Button
                style={{
                  backgroundColor: "#543EE0",
                  color: "white",
                  borderRadius: "0.5rem",
                }}
                color="teal"
                content="Login"
                onClick={() =>
                  dispatch(openModal({ type: "LoginForm", data: { from } }))
                }
              />
              <Button.Or />
              <Button
                style={{
                  backgroundColor: "#fff",
                  color: "#543EE0",
                  borderRadius: "0.5rem",
                  border: "1px solid #543EE0",
                }}
                content="Register"
                onClick={() =>
                  dispatch(openModal({ type: "RegisterForm", data: { from } }))
                }
              />
            </Button.Group>
          </Grid.Column>
          <Grid.Column>
            <Header icon>
              <Icon
                name="angle left"
                style={{
                  color: "#543EE0",
                }}
              />
              Go back
              <Button
                style={{
                  marginTop: 10,
                  backgroundColor: "#543EE0",
                  color: "white",
                }}
                content="Cancel"
                onClick={() => navigate(-1)}
              />
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
