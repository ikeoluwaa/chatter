import NavBar from "../nav/NavBar";
import AboutContent from "./AboutContent";
import WelcomeContent from "./WelcomeContent";
import WhyJoinContent from "./WhyJoinContent";
import Footer from "./Footer ";
import ModalManager from "../../app/common/modals/ModalManager";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <ModalManager />
      <WelcomeContent />
      <AboutContent />
      <WhyJoinContent />
      <Footer />
    </div>
  );
}
