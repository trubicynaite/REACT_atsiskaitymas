import { useContext } from "react";
import styled from "styled-components";

import ProductCard from "../UI/molecules/ProductCard";
import ProductsContext from "../../contexts/ProductsContext";
import { ProductsContextTypes } from "../../types";

const StyledHome = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  margin: 0 10px;
`;

const Home = () => {

    const { products } = useContext(ProductsContext) as ProductsContextTypes;

    return (
        <StyledHome>
            {
                products ?
                    products.map(product =>
                        <ProductCard
                            data={product}
                            key={product.id}
                        />
                    ) :
                    <p>There is no products to be displayed.</p>
            }
        </StyledHome>
    );
}

export default Home;