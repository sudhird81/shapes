import React from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

const Header = () => {
  return (
    <div className="header">
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" className="text-white">SHAPES</NavbarBrand>
      </Navbar>
    </div>
  );
}

export default Header;