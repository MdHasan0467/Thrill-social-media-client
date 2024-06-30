import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const Slider = () => {
  const { loading } = useContext(AuthContext);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [imgs, setImgs] = useState();

  const handleClick = (index) => {
    setCurrentSlide(index);
  };

  //! Data json object for sliding
  const slides = [
    {
      src: "https://businesspostbd.com/files/media/daily-media/Dated/2023/March/01/Mojo.png",
      _id: "Slide 1",
    },
    {
      src: "https://i.ytimg.com/vi/tVoVrMmPH8Y/maxresdefault.jpg",
      _id: "Slide 2",
    },
    {
      src: "https://www.literacyideas.com/wp-content/uploads/2021/08/1_img_6107cb72d2d9b.jpg",
      _id: "Slide 3",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-qx0NDG-kqoTPl2rzapqFgseuwL3gky96cA&s",
      _id: "Slide 4",
    },
    {
      src: "https://iotcdn.oss-ap-southeast-1.aliyuncs.com/styles/a_share_fb/oss/shampoo.jpg",
      _id: "Slide 5",
    },
    {
      src: "https://leverageedu.com/blog/wp-content/uploads/2021/05/Advertisement-Writing.png",
      _id: "Slide 6",
    },
    {
      src: "https://assets.entrepreneur.com/content/3x2/2000/1593193401-fairandlovelyedited.jpg?auto=webp&quality=95&crop=16:9&width=675",
      _id: "Slide 7",
    },
    {
      src: "https://qph.cf2.quoracdn.net/main-qimg-9bfea166ab0f145ccac5ae9c2f0f059f-lq",
      _id: "Slide 8",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVChb7ZLthcAUXlcGsrBByNIVD0dJpQi93w&usqp=CAU",
      _id: "Slide 9",
    },
    {
      src: "https://www.livelaw.in/cms/wp-content/uploads/2018/12/Horlicks-and-Complan.jpg",
      _id: "Slide 10",
    },
    {
      src: "https://www.entertales.com/wp-content/uploads/nirma.jpg",
      _id: "Slide 11",
    },
    {
      src: "https://iotcdn.oss-ap-southeast-1.aliyuncs.com/ad.jpg",
      _id: "Slide 12",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4za71294QbD1l1DXKgtR6ucZsdSC3oSB9ow&usqp=CAU",
      _id: "Slide 13",
    },
    {
      src: "https://static-cse.canva.com/blob/570189/Untitleddesign6.png",
      _id: "Slide 14",
    },
    {
      src: "https://i0.wp.com/nenow.in/wp-content/uploads/2021/04/CHYAWANPRASH.jpg?fit=1200%2C566&ssl=1",
      _id: "Slide 15",
    },
    {
      src: "https://www.dailymaverick.co.za/wp-content/uploads/mcdonalds-advert.jpg",
      _id: "Slide 16",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX2BvL22mukn_8VH6zTGfkZnDZdA75Hxn45g&usqp=CAU",
      _id: "Slide 17",
    },
    {
      src: "https://i.pinimg.com/originals/bd/ee/4e/bdee4e68dac1084edd2d201671d87b3a.png",
      _id: "Slide 18",
    },
    {
      src: "https://i.ytimg.com/vi/-eGZEIexdAM/maxresdefault.jpg",
      _id: "Slide 19",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-qx0NDG-kqoTPl2rzapqFgseuwL3gky96cA&s",
      _id: "Slide 20",
    },
    {
      src: "https://i.ytimg.com/vi/tVoVrMmPH8Y/maxresdefault.jpg",
      _id: "Slide 21",
    },
    {
      src: "https://assets.entrepreneur.com/content/3x2/2000/1593193401-fairandlovelyedited.jpg?auto=webp&quality=95&crop=16:9&width=675",
      _id: "Slide 22",
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((a) => (a + 1) % slides.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  fetch("http://localhost:5001/ad-center")
    .then((res) => res.json())
    .then((data) => setImgs(data));

  if (loading) return "Loading...";

  return (
    <div className="slider-container">
      <h1 className="uppercase text-2xl font-serif">Sponsors</h1>
      <div className="slider-image-container">
        <img
          className="w-full h-44"
          src={slides[currentSlide].src}
          alt={slides[currentSlide]._id}
        />
      </div>
      <div className="slider-bullet-container">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`slider-bullet ${
              index === currentSlide ? "active" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
