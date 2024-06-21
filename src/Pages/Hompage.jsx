import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { HOME_SECTION_API } from "../../lib/constans";
import { ColorRing } from "react-loader-spinner";

function Hompage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [homePageData, setHomePageData] = useState(null);
  const [deskTopSlider, setDesktopSlider] = useState([]);

  const getHomePageData = async () => {
    try {
      const response = await axios(HOME_SECTION_API);
      if (response?.status == 200) {
        setHomePageData(response.data.result);
        if (response.data.result?.brand_slider) {
          const desktopBanner = response.data.result?.brand_slider?.filter(
            (slider) => slider.device == "desktop"
          );
          setDesktopSlider(desktopBanner);
        }
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getHomePageData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-56	 h-screen	 mx-auto">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }
  return (
    <>
      {deskTopSlider?.length > 0 && (
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showThumbs={false}
          showArrows={false}
        >
          {deskTopSlider?.map((slider) => {
            if (slider?.device == "mobile") {
              return <></>;
            }
            return (
              <div key={slider.id_banner} onClick={() => navigate(slider?.url)}>
                <img src={slider.image} />
              </div>
            );
          })}
        </Carousel>
      )}
    </>
  );
}

export default Hompage;
