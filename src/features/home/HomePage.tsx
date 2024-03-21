import NavBar from "../nav/NavBar";
import AboutContent from "./AboutContent";
import WelcomeContent from "./WelcomeContent";
import WhyJoinContent from "./WhyJoinContent";
import Footer from "./Footer ";
import ModalManager from "../../app/common/modals/ModalManager";
import Blogs from "./Blogs";

export default function HomePage() {
  return (
    <div>
      <NavBar />

      <ModalManager />

      <div id="home">
        <WelcomeContent />
      </div>
      <div id="about">
        <AboutContent />
      </div>
      <div>
        <WhyJoinContent />
      </div>
      <div id="blogs">
        <Blogs />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
