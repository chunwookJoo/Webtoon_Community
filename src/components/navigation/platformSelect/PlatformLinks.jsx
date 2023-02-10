import { Link, useLocation } from "react-router-dom";

const PlatformLinks = (props) => {
  const { pathname } = useLocation();
  const { id, option, active } = props;
  const { icon, name, src, boardSrc } = option;

  return (
    <li onClick={() => props.getData(name)}>
      {pathname.split("/")[1] === "board" ? (
        <Link to="/board" state={boardSrc} className={active === name ? "active" : ""}>
          <span>{icon}</span>
          <span className="platform-name">{name}</span>
        </Link>
      ) : (
        <Link to={src} className={active === name ? "active" : ""}>
          <span>{icon}</span>
          <span className="platform-name">{name}</span>
        </Link>
      )}
    </li>
  );
};

export default PlatformLinks;
