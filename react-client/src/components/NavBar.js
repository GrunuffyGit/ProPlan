import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
      <Navbar color="light" light expand="md">
          <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/dd1789fa-0935-4fd9-abd8-eda15016c71f/ddve2if-fd8a0c20-8c01-458d-b9f5-38d7f00a684f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RkMTc4OWZhLTA5MzUtNGZkOS1hYmQ4LWVkYTE1MDE2YzcxZlwvZGR2ZTJpZi1mZDhhMGMyMC04YzAxLTQ1OGQtYjlmNS0zOGQ3ZjAwYTY4NGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dy-PgKB2rDxevElECLWUobYoXpW9a697Gs1HMmTIGf8" width="50em" height="50em"/>
        <NavbarBrand href="/">
            ProPlan
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/MyPlans">My Plans</NavLink>
            </NavItem>
            <NavItem>
            {!isAuthenticated && (
             <Button onClick={() => loginWithRedirect({})}>Log in</Button>
            )}
            {isAuthenticated && <Button onClick={() => logout()}>Log out</Button>}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
  );
}

export default NavBar;