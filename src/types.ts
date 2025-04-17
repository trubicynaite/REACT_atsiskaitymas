export type User = {
    id: string,
    email: string,
    password: string,
    passwordText: string,
    dob: string,
    profilePicture: string,
    role: string,
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
}