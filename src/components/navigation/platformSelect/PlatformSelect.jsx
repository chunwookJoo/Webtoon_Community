import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PlatformLinkOptions } from "./PlatformLinkOptions";
import PlatformLinks from "./PlatformLinks";

const PlatformSelect = () => {
  const [platformNameSelected, setPlatformNameSelected] = useState("전체");
  const { pathname } = useLocation();

  useEffect(() => {
    switch (pathname.split("/")[1]) {
      case "naver":
        setPlatformNameSelected("네이버");
        break;
      case "kakao":
        setPlatformNameSelected("카카오");
        break;
      case "kakaoPage":
        setPlatformNameSelected("페이지");
        break;
      default:
        setPlatformNameSelected("전체");
        break;
    }
  }, [pathname]);

  const getPlatformName = (name) => {
    setPlatformNameSelected(name);
  };

  return (
    <div className="platform-container">
      <ul className="platform-list">
        {PlatformLinkOptions.map((item) => {
          return (
            <PlatformLinks
              key={item.id}
              id={item.id}
              active={platformNameSelected}
              option={item}
              getData={getPlatformName}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default PlatformSelect;
