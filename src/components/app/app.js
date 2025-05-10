import Header from '../header/header';
import Promo from '../promo/promo';
import AboutConstructor from '../about-constuctor/about-constuctor';
import FAQ from '../questians-list/questians-list';
import Footer from '../footer/footer';
import Reviews from '../reviews/reviews';
import CakeSlider from '../products/cakes-slider'
import DesertsSlider from '../products/deserts-slider'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './app.scss';

function App() {
    return (
        <div className="app">
            <Header/>
            <Promo/>
            <AboutConstructor/>
            <CakeSlider/>
            <DesertsSlider/>
            <Reviews/>
            <FAQ/>  
            <Footer/>
        </div>
    );
}

export default App;