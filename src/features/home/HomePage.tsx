import NavBar from "../nav/NavBar";
import AboutContent from "./AboutContent";
import WelcomeContent from "./WelcomeContent";
import WhyJoinContent from "./WhyJoinContent";
import Footer from "./Footer ";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <WelcomeContent />
      <AboutContent />
      <WhyJoinContent />
      <Footer />
    </div>
  );
}
