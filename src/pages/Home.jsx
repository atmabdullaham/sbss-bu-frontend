import ApplicationSteps from "../components/home/ApplicationSteps";
import Banner from "../components/home/Banner";
import Organizer from "../components/home/Organizer";
import RegistrationTimer from "../components/home/RegistrationTimer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Banner />
      <RegistrationTimer />
      <ApplicationSteps />
      <Organizer />
    </div>
  );
};

export default Home;
