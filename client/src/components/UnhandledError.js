import React from 'react';
import {Link} from "react-router-dom";

const UnhandledError = () => {
    return (
        <div className="bounds course--detail">
          <h1>Error</h1>
          <p>Sorry! We just encountered an unexpected error.</p>
          <Link className="button button-secondary" to={'/'}>Return to List</Link>
        </div>
    );
}

export default UnhandledError;