import React, { useState, useEffect } from 'react';
import '../styles/Products.css';
import SearchBar from '../components/utilities/searchbar';


const Content = ({ category, setEditProduct, children }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);


  const deleteProduct = async (productId) => {
    const mutation = `
      mutation {
        delete_products_by_pk(id: ${productId}) {
          id
        }
      }
    `;
  
    try {
      const response = await fetch('https://productsdb.hasura.app/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': 'PdzhmZR7SDbdk2kiOyNTrHti3tfRi2e13vwT14ElYMo3rERW0tpGvNVKSSAoMjf5',
        },
        body: JSON.stringify({ query: mutation }),
      });
  
      const result = await response.json();
  
      if (result.data && result.data.delete_products_by_pk) {
        // Update UI state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
        console.error(result.errors);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };
  

  const edit = async (product) => {
  setEditProduct(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `
      query {
         products(order_by: { id: asc }) {
          id
          name
          price
          category
          type
          description
          images
        }
      }
    `;

      try {
        const response = await fetch('https://productsdb.hasura.app/v1/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': 'PdzhmZR7SDbdk2kiOyNTrHti3tfRi2e13vwT14ElYMo3rERW0tpGvNVKSSAoMjf5',
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.data) {
          const fetchedProducts = result.data.products;
          setProducts(fetchedProducts);
        } else {
          console.error('GraphQL error:', result.errors);
        }
      } catch (error) {
        console.error('Error fetching products from Hasura:', error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = category 
  ? products.filter(product => product.category === category) 
  : products; // If no type, show all products

   const searchedProducts = searchQuery 
    ? filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  return (
   
      <div className='productsSection'>
        <div className='categoryName'>{children}</div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <ul className='products'>
          {searchedProducts.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.images[0]} alt={product.name} />
              <p>{product.description}</p>
              <p className='price'>${product.price}</p>
              <button onClick={() => edit(product)}>Edit</button>
              <span className='deleteButton' onClick={() => deleteProduct(product.id)}>x</span>
            </li>
          ))}
        </ul>
      </div>
   
  );
};

export default Content;


