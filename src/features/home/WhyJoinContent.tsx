import { Button, Icon, Image } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalSlice";
import { useAppDispatch } from "../../app/store/store";

export default function WhyJoinContent() {
  const dispatch = useAppDispatch();

  return (
    <>
      <main className="why-container">
        <div>
          <h1 className="why-header">Why you should join chatter</h1>
          <p className="why-text	">
            Our goal is to make writers and readers see our platform as their
            next heaven for blogging, ensuring ease in interactions, connecting
            with like-minded peers, have access to favorite content based on
            interests and able to communicate your great ideas with people
          </p>
        </div>
        <div className=" why-grid	">
          <div className="why-list-container border-current">
            <div className="why-list">
              <Icon
                name="line graph"
                circular
                inverted
                className="why-icon"
                size="big"
                style={{ backgroundColor: "#d6d1f8 !important" }}
              />

              <h3>Analytics </h3>
              <p>
                Analytics to track the number of views, likes and comment and
                also analyze the performance of your articles over a period of
                time
              </p>
            </div>
          </div>
          <div className="why-list-container">
            <div className="why-list">
              <Icon
                name="group"
                circular
                inverted
                className="why-icon"
                size="big"
              />
              <h3 className="">Social interactions</h3>
              <p>
                Users on the platform can interact with posts they like, comment
                and engage in discussions
              </p>
            </div>
          </div>
          <div className="why-list-container">
            <div className="why-list">
              <Icon
                name="newspaper"
                className="why-icon"
                circular
                inverted
                size="big"
              />

              <h3>Content creation</h3>
              <p>
                Write nice and appealing with our in-built markdown, a rich text
                editor
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="testimonia">
        <div className="testimonia-grid">
          <div>
            <Image
              className="testimonia-img"
              src="join.jpg"
              alt=""
              size="medium"
              circular
            />
          </div>
          <div style={{ padding: "3.8rem" }}>
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </p>
            <p>Adebobola Muhydeen, Software developer at Apple</p>
            <Button
              onClick={() => dispatch(openModal({ type: "SignupForm" }))}
              style={{
                marginTop: "1rem",
                backgroundColor: "#543EE0",
                color: "white",
                borderRadius: "0.5rem",
              }}
              content="Join chatter"
              floated="left"
            />
          </div>
        </div>
      </div>
    </>
  );
}
