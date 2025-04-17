import { createContext, useReducer, useEffect } from "react";

import { Product, ProductsReducerActionTypes, ChildrenProp, ProductsContextTypes } from "../types";

const reducer = (state: Product[], action: ProductsReducerActionTypes): Product[] => {
    switch (action.type) {
        case 'setData':
            return action.data;
        case 'deleteProduct':
            return state.filter(product => product.id !== action.productId);
        default:
            console.error('Sorry, there was an error.')
            return state;
    }
};

const ProductsContext = createContext<ProductsContextTypes | undefined>(undefined);

const ProductsProvider = ({ children }: ChildrenProp) => {

    const [products, dispatch] = useReducer(reducer, []);

    useEffect(() => {
        fetch(`http://localhost:8080/products`)
            .then(res => res.json())
            .then((data: Product[]) => {
                dispatch({
                    type: 'setData',
                    data: data
                });
            })
    }, []);

    const deleteProduct = (id: Product["id"]) => {
        fetch(`http://localhost:8080/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        dispatch({
            type: 'deleteProduct',
            productId: id
        })
    };

    return (
        <ProductsContext.Provider
            value={{
                products,
                deleteProduct
            }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider };
export default ProductsContext;