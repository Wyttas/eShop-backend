"use client";

import React, { useState, useEffect } from 'react';
import Content from '../components/Content';
import AddProduct from '../components/AddProduct';
import '../styles/App.css';




const App = () => {
  const [selected, setSelected] = useState(''); 
  const [editProduct, setEditProduct] = useState(''); 
  const [addProduct, setAddProduct] = useState(''); 

  // Handle category selection
  const handleCategoryClick = (category) => {
    setAddProduct('');
    setSelected(category === 'All Products' ? '' : category);
  };
  
  // Handle category selection (or product action selection)
  const addNewProduct = (newProduct) => {
    setAddProduct(newProduct);
    // Use newProduct (the parameter) for checking instead of the state addProduct
    if (newProduct === 'New Product') {
      setEditProduct({});
    }
    setSelected('All Products');
  };


  useEffect(() => {
    // Only set to "Edit Product" if editProduct is a non-empty object
    if (editProduct && typeof editProduct === 'object' && Object.keys(editProduct).length > 0) {
      setAddProduct('Edit Product');
    }
  }, [editProduct]);

  return (
    <div id='root'>
    <section>
      <div className='sideBar'>
        <nav>
          <ul>
            <li
              className={selected === '' ? 'active' : ''}
              onClick={() => handleCategoryClick('All Products')}
            >
              All Products
            </li>
            <li
              className={selected === 'Electronics' ? 'active' : ''}
              onClick={() => handleCategoryClick('Electronics')}
            >
              Electronics
            </li>
            <li
              className={selected === 'Home appliances' ? 'active' : ''}
              onClick={() => handleCategoryClick('Home appliances')}
            >
              Home appliances
            </li>
            <li
              className={selected === 'Other' ? 'active' : ''}
              onClick={() => handleCategoryClick('Other')}
            >
              Other
            </li>
          </ul>

        </nav>
        <button onClick={() => addNewProduct('New Product')}>
          Add new product
        </button>

      </div>
      <main>
        {addProduct ? (
          <AddProduct edit={editProduct}/>
        ) : (
          <Content category={selected} setEditProduct={setEditProduct}>
            <h2>{selected ? selected : 'All products'}</h2>
          </Content>
        )}
      </main>
    </section>
    </div>
  );
};

export default App;

