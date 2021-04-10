//  import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container,NavDropdown} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../action/userAction'
import { removeAllFromCart } from '../action/cartAction'

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        dispatch(removeAllFromCart())
    }
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand >HOME</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              
              <LinkContainer to='/cart' >
              <Nav.Link ><i className="fas fa-shopping-cart"></i>cart</Nav.Link>
              </LinkContainer>

              {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>

                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                    </LinkContainer>
                                )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

// Header.defaultProps={
//     title: 'This is header',
// }

// Header.prototype={
//     title : PropTypes.string,
// }

export default Header;
