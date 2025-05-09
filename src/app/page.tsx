"use client";

import React, { useState, useEffect } from 'react';
import Content from '../components/Content';
import AddProduct from '../components/AddProduct';
import '../styles/App.css';
import { ProductType } from '../types/product';


const App: React.FC = () => {
  const [selected, setSelected] = useState<string>(''); 
  const [editProduct, setEditProduct] = useState<ProductType | null>(null); 
  const [addProduct, setAddProduct] = useState<string>(''); 

  const handleCategoryClick = (category: string) => {
    setAddProduct('');
    setSelected(category === 'All Products' ? '' : category);
  };

  const addNewProduct = (newProduct: string) => {
    setAddProduct(newProduct);
    if (newProduct === 'New Product') {
      setEditProduct({} as ProductType);
    }
    setSelected('All Products');
  };

  useEffect(() => {
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
              <li className={selected === '' ? 'active' : ''} onClick={() => handleCategoryClick('All Products')}>
                All Products
              </li>
              <li className={selected === 'Electronics' ? 'active' : ''} onClick={() => handleCategoryClick('Electronics')}>
                Electronics
              </li>
              <li className={selected === 'Home appliances' ? 'active' : ''} onClick={() => handleCategoryClick('Home appliances')}>
                Home appliances
              </li>
              <li className={selected === 'Other' ? 'active' : ''} onClick={() => handleCategoryClick('Other')}>
                Other
              </li>
            </ul>
          </nav>

          <button onClick={() => addNewProduct('New Product')}>Add new product</button>
        </div>

        <main>
          {addProduct ? (
            <AddProduct edit={editProduct} />
          ) : (
            <Content category={selected} setEditProduct={setEditProduct}>
              <h2>{selected || 'All products'}</h2>
            </Content>
          )}
        </main>
      </section>
    </div>
  );
};

export default App;
