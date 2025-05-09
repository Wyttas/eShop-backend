"use client";

import React, { useState, useEffect } from 'react';
import AddPictures from '../components/AddPictures';
import FormField from '../components/utilities/formfield';
import { ProductType } from '../types/product';
import { FormStateType } from '../types/formState';


type AddProductProps = {
    edit: ProductType | null;
  };
  
 
  const AddProduct: React.FC<AddProductProps> = ({ edit }) => {

const formFields: {
  id: keyof FormStateType;
  label: string;
  className: string;
}[] = [
  { id: "productName", label: "Product Name:", className: "form-product-name" },
  { id: "productPictures", label: "Product Pictures:", className: "form-product-pictures" },
  { id: "productDescription", label: "Product Description:", className: "form-product-description" },
  { id: "productCategory", label: "Product Category:", className: "form-product-category" },
  { id: "productType", label: "Product Type:", className: "form-product-type" },
  { id: "productPrice", label: "Product Price:", className: "form-product-price" },
];
  
  const [formStates, setFormStates] = useState<FormStateType>({
    productName: '',
    productDescription: '',
    productCategory: '',
    productType: '',
    productPrice: '',
    productPictures: [],
  });

  useEffect(() => {
    if (edit) {
      setFormStates({
        productName: edit.name || '',
        productDescription: edit.description || '',
        productCategory: edit.category || '',
        productType: edit.type || '',
        productPrice: edit.price?.toString() || '',
        productPictures: edit.images || [],
      });
    }
  }, [edit]);



  const handleInputChange = (formId: string, value: string | string[]) => {
    setFormStates((prev) => ({
      ...prev,
      [formId]: value,
    }));
  };

  const handleSubmitAll = async () => {
    const isEditing = edit && edit.id;
  
    const mutation = isEditing
      ? `
        mutation UpdateProduct {
          update_products_by_pk(pk_columns: {id: ${edit.id}}, _set: {
            name: "${formStates.productName}",
            description: "${formStates.productDescription}",
            category: "${formStates.productCategory}",
            type: "${formStates.productType}",
            price: ${parseFloat(formStates.productPrice)},
            images: ${JSON.stringify(formStates.productPictures)}
          }) {
            id
          }
        }
      `
      : `
        mutation InsertProduct {
          insert_products_one(object: {
            name: "${formStates.productName}",
            description: "${formStates.productDescription}",
            category: "${formStates.productCategory}",
            type: "${formStates.productType}",
            price: ${parseFloat(formStates.productPrice)},
            images: ${JSON.stringify(formStates.productPictures)}
          }) {
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
  
      if (result.data) {
        alert(`Product ${isEditing ? 'updated' : 'added'} successfully!`);
        setFormStates({
            productName: '',
            productDescription: '',
            productCategory: '',
            productType: '',
            productPrice: '',
            productPictures: [],
          });
      } else {
        alert(`Failed to ${isEditing ? 'update' : 'add'} product.`);
        console.error(result.errors);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'adding'} the product:`, error);
      alert(`Error ${isEditing ? 'updating' : 'adding'} the product.`);
    }
  };
  
  

  const isFormValid = formFields.every(({ id }) => {
    const value = formStates[id as keyof FormStateType];
  
    if (id === 'productPictures') {
      return Array.isArray(value) && value.length > 0;
    }
  
    if (id === 'productPrice') {
      return value !== '' && !isNaN(Number(value)) && Number(value) > 0;
    }
  
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
  
    return false; // fallback for any unexpected value
  });
  
  
  return (
    
        <div>
          {formFields.map(({ id, label, className }) =>
            id !== 'productPictures' ? (
              <FormField
                key={id}
                formId={id}
                label={label}
                className={className}
                value={formStates[id] || ""}
                onChange={handleInputChange}
              />
            ) : <AddPictures
              key={id}
              formId={id}
              label={label}
              className={className}
              value={formStates[id] || []}
              onChange={handleInputChange}
            />
          )}
          <button
            onClick={handleSubmitAll}
            disabled={!isFormValid} // Disable the button if any required field is empty
          >
            Submit All
          </button>
        </div>

  );
};

export default AddProduct;

