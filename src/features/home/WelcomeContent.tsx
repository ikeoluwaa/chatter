import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function WelcomeContent() {
  return (
    <section className="home-page-container">
      <div className="header-container">
        <div className="header-inner">
          <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
          <p>
            Unleash the Power of Words, Connect with Like-minded Readers and
            Writers
          </p>
          <Button
            style={{
              marginTop: "1rem",
              backgroundColor: "#543EE0",
              color: "white",
              borderRadius: "0.5rem",
            }}
            as={Link}
            to="/feeds"
          >
            Get started
          </Button>
        </div>
      </div>
    </section>
  );
}
