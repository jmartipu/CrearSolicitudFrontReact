import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <button type="button" className="btn btn-primary" onClick={() => props.display_form('login')}>login</button>
      <button type="button" className="btn btn-link" onClick={() => props.display_form('signup')}>signup</button>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <span onClick={props.handle_logout}>logout</span>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired,
};