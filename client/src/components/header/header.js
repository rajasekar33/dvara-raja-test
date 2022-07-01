import React from 'react';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

const Header = (props) => (
    <div className='header'>
        {/* <Router>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </Router> */}
    </div>
);

export default Header;