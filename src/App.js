import "./App.css";
import BeforeWeBeginCard from "./components/before-we-begin-card/BeforeWeBeginCard";
import BeforeWeBegin from "./components/before-we-begin/BeforeWeBegin";
import Book from "./components/book/Book";
import BottomContent from "./components/bottom-content/BottomContent";
import CardCarousel from "./components/card-carousel/CardCarousel";
import CardScroll from "./components/card-scroll/CardScroll";
import ClientCarousel from "./components/client-carousel/ClientCarousel";
import Faq from "./components/faq/Faq";
import Header from "./components/header/Header";
import HeroBanner from "./components/hero-banner/HeroBanner";
import Promo from "./components/promo/Promo";
import VideoService from "./components/video-service/VideoService";
import VideoTestimonial from "./components/video-testimonial/VideoTestimonial";
import New from "./components/new/New";
import Temp from "./components/temp/Temp";
function FaqAnimatedCircles() {
  return (
    <div className="faq-animated-circles-wrapper">
      <div className="faq-animated-circle1" />
      <div className="faq-animated-circle2" />
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <HeroBanner />
      <Promo />
      <New />
      <Temp />
      <CardScroll />
      <ClientCarousel />
      <CardCarousel />
      {/* <VideoService /> */}
      {/* <div className="bwg-main-container-wrapper"> */}
        {/* <div className="bwg-main-container-wrapper-bg"></div> */}
        {/* <BeforeWeBegin /> */}
        <BeforeWeBeginCard />
      {/* </div> */}
      <Book />
      <div className="end-content-wrapper">
        <div className="end-content-background-circle"></div>
        <VideoTestimonial />
        <div style={{ position: "relative" }}>
          <FaqAnimatedCircles />
          <Faq />
        </div>
        <BottomContent />
      </div>
    </>
  );
}

export default App;
