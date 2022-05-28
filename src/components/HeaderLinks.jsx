import { Link } from "react-router-dom";
import {YearListData } from "./YearListData";


const a = YearListData();
const HeaderLinks = () => {
  return (
    <section id="header-strip">
    <div className="test"><h3>Select the year: </h3></div>
    <ul>
      {a.map(i => {
        return (
          <li key={i+"header"} className="crum-menu">
          <Link to={"/table/" + i}>
            {i}
          </Link>
          </li>
        );
      })}
    </ul>
    </section>
  );
};

export default HeaderLinks; 