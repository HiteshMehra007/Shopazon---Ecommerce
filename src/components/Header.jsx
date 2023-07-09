import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Navbar, Container, FormControl, Dropdown, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartState } from '../context/Context';
import { AiFillDelete } from 'react-icons/ai';

const Header = () => {
    const {
        state: {cart},
        dispatch,
        productDispatch
    } = CartState();
  return (
    <Navbar bg='dark' variant='dark' style={{height: 80}}>
        <Container>
            <Navbar.Brand>
                <Link href="/">Shopazon</Link>
            </Navbar.Brand>
            <Navbar.Text className='search'>
                <FormControl 
                    style={{width: 500}}
                    placeholder='Search a product'
                    className='m-auto'
                    onChange={(e) => 
                        productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value,
                        })
                    }
                / >
            </Navbar.Text>
            <Dropdown>
                <Dropdown.Toggle variant="success">
                    <FaShoppingCart color="white" fontSize="25px" />
                    <Badge>{cart.length}</Badge>
                </Dropdown.Toggle>

                <Dropdown.Menu style={{minWidth: 370}}>
                    {
                        cart.length > 0 ? (
                            <>
                            {
                                cart.map((prod) => (
                                    <span className='cartitem' key={prod.id}>
                                        <img src={prod.image} alt={prod.name} className='cartItemImg' />
                                        <div className='cartItemDetails'>
                                            <span>{prod.name}</span>
                                            <span>₹ {prod.price}</span>
                                        </div>
                                        <AiFillDelete
                                            fontSize="20px"
                                            style={{cursor: "pointer"}}
                                            onClick={() => dispatch({type:"REMOVE_FROM_CART", payload:prod})}
                                        />
                                    </span>
                                ))
                            }
                            <Link to="/cart">
                                <Button style={{ width:"95%" , margin: "0 10px"}}>
                                    Go To Cart
                                </Button>
                            </Link>
                            </>
                        ) : (<span style={{ padding: 10 }}>Cart is Empty!</span>)
                    }
                </Dropdown.Menu>
            </Dropdown>
        </Container>
    </Navbar>
  )
}

export default Header;