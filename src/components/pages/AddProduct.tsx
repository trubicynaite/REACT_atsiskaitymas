import { v4 as generatedId } from "uuid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";

import ProductsContext from "../../contexts/ProductsContext";
import { ProductsContextTypes, UsersContextTypes } from "../../types";
import UsersContext from "../../contexts/UsersContext";

const StyledAdd = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;

    >h2 {
    text-align: center;
    color: #ff69b4;
    }

    >form {
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    color: white;
    width: 300px;

    input[type="text"],
    input[type="password"],
    input[type="submit"],
    input[type="email"],
    input[type="date"],
    input[type="url"] {
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    }

    >input[type="submit"] {
    background-color: #ff69b4;
    border: none;
    border-radius: 50px;
    padding: 8px 16px;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffa1d0;
      color: black;
      }
    }

    >div {
      margin-bottom: 10px;

      > input{

        &:focus{
          background-color: #ffa1d0;
          color: black;
        }
      }
    }
    }
`

const AddProduct = () => {

    const { products, addProduct } = useContext(ProductsContext) as ProductsContextTypes;
    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [addedMessage, setAddedMessage] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setAddedMessage(''), 2000);
        return () => clearTimeout(timer);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            brandName: '',
            price: '',
            description: '',
            productPicture: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(5, 'Name must be at least 5 symbols length.')
                .max(50, 'Name must be shorter than 50 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            brandName: Yup.string()
                .max(20, 'Name must be shorter than 20 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            price: Yup.string()
                .min(2, 'Price must be at least 2 symbols length.')
                .max(5, 'Name must be shorter than 5 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            description: Yup.string()
                .min(20, 'Description must be at least 20 symbols length.')
                .max(200, 'Name must be shorter than 200 symbols.')
                .required('Field cannot be empty.')
                .trim(),
            productPicture: Yup.string()
                .url('Product image must be a valid URL.')
                .matches(
                    /\.png|\.jpg|\.jpeg|\.webm|\.svg$/i,
                    'URL must be an image.')
                .trim()
                .default('https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg')
        }),
        onSubmit: (values) => {
            const existingProduct = products.find(product => product.name.toLowerCase() === values.name.toLowerCase());

            if (existingProduct) {
                setError('Products already exists');
                setAddedMessage('');
            } else {
                const newProduct = {
                    ...values,
                    id: generatedId(),
                    creatorId: loggedInUser?.id,
                    createdAt: new Date().toISOString(),
                    productPicture: values.productPicture || 'https://www.shutterstock.com/image-vector/missing-picture-page-website-design-600nw-1552421075.jpg'
                };
                addProduct(newProduct);
                setError('');
                setAddedMessage('Product successfully added.')
                formik.resetForm();
                setTimeout(() => {
                    navigate('/')
                }, 1500);
            }
        }
    })

    return (
        <StyledAdd>
            <h2>Add new Product</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label
                        htmlFor="name">Product name:</label>
                    <input
                        type="text"
                        name="name" id="name"
                        placeholder="Enter product name"
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.name && formik.errors.name &&
                        <p>{formik.errors.name}</p>
                    }
                </div>
                <div>
                    <label
                        htmlFor="brandName">Brand name:</label>
                    <input
                        type="text"
                        name="brandName" id="brandName"
                        placeholder='Enter brand name'
                        value={formik.values.brandName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.brandName && formik.errors.brandName &&
                        <p>{formik.errors.brandName}</p>
                    }
                </div>
                <div>
                    <label
                        htmlFor="">Price:</label>
                    <input
                        type="text"
                        name="price" id="price"
                        placeholder='Enter product price'
                        value={formik.values.price}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.price && formik.errors.price &&
                        <p>{formik.errors.price}</p>
                    }
                </div>
                <div>
                    <label
                        htmlFor="description">Product description:</label>
                    <input
                        type="text"
                        name="description" id="description"
                        placeholder='Repeat password'
                        value={formik.values.description}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.description && formik.errors.description &&
                        <p>{formik.errors.description}</p>
                    }
                </div>
                <div>
                    <label
                        htmlFor="productPicture">Product picture:</label>
                    <input
                        type="url"
                        name="productPicture" id="productPicture"
                        placeholder="Enter a valid URL"
                        value={formik.values.productPicture}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {
                        formik.touched.productPicture && formik.errors.productPicture &&
                        <p>{formik.errors.productPicture}</p>
                    }
                </div>
                <input type="submit" value="Add product" />
            </form>
            {
                addedMessage && <p style={{ color: '#ff69b4' }}>{addedMessage}</p>
            }
            {
                error && <p style={{ color: 'white' }}>{error}</p>
            }
        </StyledAdd>
    );
}

export default AddProduct;