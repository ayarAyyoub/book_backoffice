import React, { useState } from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import { navbarLinks } from '../constants/routes.constant';



export default () => {


    const [isOpen, setIsOpen] = useState(false); 

    return (
        <Navbar color="primary" dark  expand="md">
            <NavbarBrand tag={Link} to="/">Book management Backoffice</NavbarBrand>
            <NavbarToggler onClick={()=>setIsOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
                {
                    navbarLinks.map((option, index) => <NavItem  key={"nav-links-"+index}>
                        <NavLink tag={Link} to={option.path}>{option.title}</NavLink>
                      </NavItem>)
                } 
            </Nav>
          </Collapse>
        </Navbar>
    )
}
