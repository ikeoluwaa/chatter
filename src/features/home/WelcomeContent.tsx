import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

export default function WelcomeContent() {
  return (
    <section className="home-page-container">
      <div
        className="header-container"
        // style={{
        //   backgroundImage: 'url("/homeScreen.jpg")',
        //   // Optionally, you can specify other background properties like size, position, etc.
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   // You can also specify fallback background color in case the image fails to load
        //   backgroundColor: "#f0f0f0",
        // }}
      >
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
