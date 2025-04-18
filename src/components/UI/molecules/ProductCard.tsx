import styled from "styled-components";

import { Product, UsersContextTypes } from "../../../types";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import UsersContext from "../../../contexts/UsersContext";
import ProductsContext from "../../../contexts/ProductsContext";
import { ProductsContextTypes } from "../../../types";

type Props = {
    data: Product,
    hideLikeButton?: boolean
}

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between; 

    background-color: #1e1e1e;
    color: white;
    border-radius: 12px;
    padding: 20px;
    margin: 16px auto;
    min-height: 500px;
    max-width: 400px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
    
    >h2, h3 {
        color: #ff69b4;
        margin: 0;
     }

    >p {
        font-size: 14px;
        margin: 6px 0;
     }

    >img {
        width: 100%;
        max-height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin: 10px 0;
     }

    >button {
        background-color: #ff69b4;
        color: white;
        border: none;
        padding: 10px 16px;
        border-radius: 30px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #ffa1d0;
            color: black;
        }
  }

    >span {
        display: block;
        margin-top: 10px;
        color: #ff69b4;
        font-size: 0.9rem;
  }

    .delete-btn {
        background-color: transparent;
        color: #ff69b4;
        border: 2px solid #ff69b4;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;

        &:hover {
        background-color: #ff69b4;
        color: white;
        }
    }
`

const ProductCard = ({ data, hideLikeButton }: Props) => {

    const { loggedInUser, dispatch } = useContext(UsersContext) as UsersContextTypes;
    const { deleteProduct } = useContext(ProductsContext) as ProductsContextTypes;
    const navigate = useNavigate();
    const [likedMessage, setLikedMessage] = useState<string>('');

    const likeProduct = () => {
        if (!loggedInUser) {
            navigate('/');
            return;
        }

        const alreadyLiked = loggedInUser.likedProducts?.includes(data.id);

        if (alreadyLiked) {
            setLikedMessage('You have already liked this product.')
        } else {
            dispatch({
                type: 'likeProduct',
                userId: loggedInUser.id,
                productId: data.id
            });
            setLikedMessage('Added to Liked products.')
        }
        setTimeout(() => {
            setLikedMessage('')
        }, 2000);
    }

    const deleteProd = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            deleteProduct(data.id);
            navigate('/');
        }
    };

    return (
        <StyledCard>
            <h3>{data.brandName}</h3>
            <h2>{data.name}</h2>
            <p>Category: {data.category}</p>
            <img src={data.productPicture} alt={data.name} />
            <p>Price: {data.price} Eur.</p>
            <p>Description: {data.description}</p>
            {loggedInUser && !hideLikeButton && (
                <>
                    <button onClick={likeProduct}>Like product</button>
                    {likedMessage && <span style={{ color: "#ff69b4" }}>{likedMessage}</span>}
                </>
            )}

            {loggedInUser?.role === 'admin' && (
                <button onClick={deleteProd} className="delete-btn">Delete Product</button>
            )}

        </StyledCard>
    );
}

export default ProductCard;