import {
  Button,
  Container,
  Segment,
  Grid,
  GridColumn,
  Icon,
  Image,
} from "semantic-ui-react";

export default function WhyJoinContent() {
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
          <div className="why-list border-current		">
            <div className="">
              <Icon
                name="line graph"
                circular
                inverted
                color="blue"
                size="large"
              />

              <h3 className="mb-4 font-medium	text-3xl	">Analytics </h3>
              <p className="">
                Analytics to track the number of views, likes and comment and
                also analyze the performance of your articles over a period of
                time
              </p>
            </div>
          </div>
          <div className="why-list">
            <div className="">
              <Icon name="users" circular inverted />
              <h3 className="">Social interactions</h3>
              <p>
                Users on the platform can interact with posts they like, comment
                and engage in discussions
              </p>
            </div>
          </div>
          <div className="why-list">
            <div className="p-8">
              <Icon />

              <h3 className="mb-4 font-medium	text-3xl	">Content creation</h3>
              <p className="mb-0 ">
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
            <img src="" alt="" />
          </div>
          <div style={{ padding: "3.8rem" }}>
            <p style={{ fontSize: "1.4rem", marginBottom: "3rem" }}>
              "Chatter has become an integral part of my online experience. As a
              user of this incredible blogging platform, I have discovered a
              vibrant community of individuals who are passionate about sharing
              their ideas and engaging in thoughtful discussions.”
            </p>
            <p>Adebobola Muhydeen, Software developer at Apple</p>
            <Button content="Join chatter" floated="left" />
          </div>
        </div>
      </div>
    </>
  );
}
