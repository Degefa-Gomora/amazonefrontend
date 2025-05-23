import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider.jsx';
import {auth} from "../../Utility/firebase.js"

function Header() {
  const { state,dispatch } = useContext(DataContext);
  const { user, basket } = state;
  const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <section className={classes.fixed_header}>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>
            {/* Delivery */}
            <div className={classes.delivery}>
              <span>
                <CiLocationOn />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/* search */}
            <select name="" id="">
              <option value="All">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search products" />
            <BsSearch size={25} />
            {/* icon */}
          </div>
          {/* Right side link */}
          <div className={classes.order_container}>
            <div className={`${classes.language} ${classes.combined_hover}`}>
              <img
                src="https://image.shutterstock.com/image-vector/usa-flag-icons-vector-set-260nw-2491312125.jpg"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </div>
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>SignOut</span>
                  </>
                ) : (
                  <>
                    <p> Sign In</p>
                    <span>Accounts and Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* orders */}
            <Link to="/orders" className={classes.orders}>
              <div>
                <p>returns</p>
                <span>& Orders</span>
              </div>
            </Link>
            {/* Carts */}
            <Link to={"/cart"} className={classes.cart}>
              <BiCart size={25} />
              <span>{totalItems}</span>
            </Link>
          </div>
        </div>
        <LowerHeader />
      </section>
    </section>
  );
}

export default Header