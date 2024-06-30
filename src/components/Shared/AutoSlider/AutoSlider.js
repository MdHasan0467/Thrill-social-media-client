import React, { useState } from "react";
import ImageSlider, { Slide } from "react-auto-image-slider";

const AutoSlider = () => {
  const [adds, setAds] = useState();

  fetch("http://localhost:5001/ad-center")
    .then((res) => res.json())
    .then((data) => setAds(data));

  // console.log(adds)

  return (
    <div>
      <ImageSlider effectDelay={500} autoPlayDelay={2000}>
        {adds?.map((data, index) => (
          <Slide>
            <img key={data?._id} src={data?.AdImage} alt={index + 1} />
          </Slide>
        ))}
      </ImageSlider>
    </div>
  );
};

export default AutoSlider;
