import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImg1 from "../../assets/banner/banner1.png";
import bannerImg2 from "../../assets/banner/banner2.png";
import bannerImg3 from "../../assets/banner/banner3.png";

const Banner = () => {
  return (
    <div className="md:h-[66vh] w-full">
      <Carousel
        className="h-full"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
      >
        <div className="md:h-[66vh]">
          <img src={bannerImg1} className="h-full w-full " />
        </div>
        <div className="md:h-[66vh]">
          <img src={bannerImg2} className="h-full w-full " />
        </div>
        <div className="md:h-[66vh]">
          <img src={bannerImg3} className="h-full w-full" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
