import React from 'react';
import { CartState } from '../context/Context';
import SingleProduct from './SingleProduct';
import Filter from './Filter';
import './style.css';

const Home = () => {

  const { state: { products }, productState: {sort, byStock, byDelivery, byRating, searchQuery} } = CartState();

  const transfromProducts = () => {
    let sortedProducts = products;

    if(sort){
      sortedProducts = sortedProducts.sort((a,b) => (
        sort === "lowToHigh" ? a.price-b.price : b.price - a.price
      ))
    }

    if(!byStock){
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if(byDelivery){
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if(byRating){
      sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);
    }
    if(searchQuery){
      sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery));
    }
    return sortedProducts;
  }

  return (
    <div className='home'>
      <Filter />
      <div className='productContainer'>
        {
          transfromProducts().map((prod) => {
            return <SingleProduct key={prod.id} prod={prod} />
          })
        }
      </div>
    </div>
  )
}

export default Home;