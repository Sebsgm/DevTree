let productName = "Table"
let isAuth = false
let price = 30

type Product = {
        id: number,
        price: number,
        name: string,

}

type ProductID1 = Pick<Product, 'id'> // Toma uno o los necesarios del Type "Padre"
type ProductID2 = Omit<Product, 'price' | 'name'> // Omite los elementos del Type "Padre"



let product3: ProductID2 = {
        id:1,
}

let product: Product = {
        id:1,
        price:30,
        name:"Tablet"
}

let product2: FullProduct = {
        id:2,
        price:30,
        name:"Tablet 11 pulgadas",
        image: "produc.jpg"
}

interface FullProduct extends Product { // Se hereda el contenido del Product (Se puede de Type a Interface o viceversa)
        image: string
}

type FullProduct2 = Product& { //Con esta sintaxis se hereda
        lastname: string
}

interface ProductID{
        id: Product['id'] //Se utiliza el ID del interface Product
}

const number = [10,20,30]