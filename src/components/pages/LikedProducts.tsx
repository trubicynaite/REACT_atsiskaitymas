import { useContext } from "react";
import styled from "styled-components";

import ProductCard from "../UI/molecules/ProductCard";
import ProductsContext from "../../contexts/ProductsContext";
import { ProductsContextTypes } from "../../types";

import UsersContext from "../../contexts/UsersContext";
import { UsersContextTypes } from "../../types";

const StyledLiked = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

  >h2 {
    font-size: 1.5rem;
    color: #ff69b4;
    margin-bottom: 20px;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%;
    max-width: 1200px;
  }

  > p {
    color: #ff69b4;
    font-size: 1.2rem;
  }
`;

const LikedProducts = () => {

    const { products } = useContext(ProductsContext) as ProductsContextTypes;

    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;

    return (
        <StyledLiked>
            <h2>My liked Products</h2>
            <div className="cards">
                {
                    products ?
                        products
                            .filter(product => loggedInUser?.likedProducts?.includes(product.id))
                            .map(product =>
                                <ProductCard
                                    data={product}
                                    key={product.id}
                                    hideLikeButton={true}
                                />
                            ) :
                        <p>You have not liked any products yet.</p>
                }
            </div>
        </StyledLiked>
    );
}

export default LikedProducts;