import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slider.css';

import car1 from '../../img/car1.jpg';
import car2 from '../../img/car2.jpg';
import car3 from '../../img/car3.jpg';
import car4 from '../../img/car4.jpg';

function HomeSlider() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000, 
    };
  
    const images = [car1, car2, car3, car4]; 
  
    return (
      <div className="home-slider">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Car ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
  
  export default HomeSlider;