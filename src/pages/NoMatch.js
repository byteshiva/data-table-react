import { Link } from "react-router-dom";

function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/support">Go to the support page</Link>
        </p>
      </div>
    );
  }

export default NoMatch;