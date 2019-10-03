import React from 'react'
import Slider from "react-slick";
import { Image } from "semantic-ui-react";

function Banner() {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <Slider {...setting}>
            <div>
                <Image 
                    src='http://www.molecularproducts.com/wp-content/uploads/2017/01/placeholder-product-banner.jpg'
                 />
            </div>
            <div>
                <Image 
                    src='http://www.molecularproducts.com/wp-content/uploads/2017/01/placeholder-product-banner.jpg'
                 />
            </div>
            <div>
                <Image 
                    src='http://www.molecularproducts.com/wp-content/uploads/2017/01/placeholder-product-banner.jpg'
                 />
            </div>
        </Slider>
    )
}

export default Banner
