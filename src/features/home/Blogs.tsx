import { Button, Image } from "semantic-ui-react";
import { useAppDispatch } from "../../app/store/store";
import { openModal } from "../../app/common/modals/modalSlice";

export default function Blogs() {
  const dispatch = useAppDispatch();

  return (
    <div className="footer-main-grid">
      <div>
        <div className="footer-group-image">
          <Image
            className="footer-imgs"
            src="testimonia2.jpg"
            alt=""
            circular
          />
          <Image
            className="footer-imgs  special"
            src="testimonia2.jpg"
            alt=""
            circular
          />
          <Image
            className="footer-imgs"
            src="testimonia1.jpg"
            alt=""
            circular
          />
        </div>
      </div>
      <div className="footer-main">
        <h3>Write, read and connect with great minds on chatter</h3>
        <p>
          Share people your great ideas, and also read write-ups based on your
          interests. connect with people of same interests and goals
        </p>
        <Button
          onClick={() => dispatch(openModal({ type: "SignupForm" }))}
          style={{
            marginTop: "1rem",
            backgroundColor: "#543EE0",
            color: "white",
            borderRadius: "0.5rem",
          }}
        >
          Get started
        </Button>
      </div>
    </div>
  );
}
