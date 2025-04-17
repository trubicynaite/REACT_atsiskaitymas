export type ChildrenProp = {
    children: React.ReactElement
}

export type User = {
    id: string,
    username: string,
    email: string,
    password: string,
    passwordText: string,
    dob: string,
    profilePicture: string,
    role: "admin" | "user",
    likedProducts: string[]
};

export type Product = {
    id: string,
    name: string,
    brandName: string,
    category: string,
    price: number,
    description: string,
    productPicture: string,
    skinType: string[]
};

export type UsersReducerActionTypes =
    { type: 'setData', data: User[] } |
    { type: 'addUser', newUser: User } |
    { type: 'likeProduct', productId: Product["id"], userId: User['id'] };

export type UsersContextTypes = {
    users: User[],
    loggedInUser: User | null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    dispatch: React.Dispatch<UsersReducerActionTypes>
};

export type ProductsReducerActionTypes =
    { type: 'setData', data: Product[] } |
    { type: 'deleteProduct', productId: Product["id"] };

export type ProductsContextTypes = {
    products: Product[],
    deleteProduct: (id: Product["id"]) => void
};