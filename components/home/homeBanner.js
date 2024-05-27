import Link from "next/link";
import Slider from "react-slick";
export default function HomeBanner(props) {
  const homeSlider = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    dots: true,
    arrows: false,
  };
  const removeHTML = (string) => {
    const regex = /(<([^>]+)>)/gi;
    return string.replace(regex, " ");
  };

  return (
    <>
      <section className="home-banner">
        <div className="home-banner-content">
          <div className="container">
            {props.bannerContent.map((item) => {
              if (item.section_name == "banner-contents") {
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.content,
                    }}
                  ></div>
                );
              }
            })}
          </div>
        </div>
        <div className="home-banner-navarea"></div>
        <div className="home-banner-item">
          <div className="home-banner-img">
            {props?.content && props?.content.length > 0 && (
              <img
                src={props?.content[0].image_url}
                alt="Workwise"
                width="1920"
                height="820"
                priority="true"
              />
            )}
          </div>
        </div>
        {/* <Slider {...homeSlider}>
					{props?.content.map((item) => {
						return (
							<div className="home-banner-item" key={item.id}>
								<div className="home-banner-img">
									<img
										src={item.image_url}
										alt="Workwise"
										width="1920"
										height="820"
										priority="true"
									/>
								</div>
							</div>
						);
					})}
				</Slider> */}
      </section>
    </>
  );
}
