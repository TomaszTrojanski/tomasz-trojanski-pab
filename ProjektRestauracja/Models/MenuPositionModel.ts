import Product from './ProductModel';

enum Type 
{
    Starter,
    MainDish,
    SideDish,
    Drink,
    Dessert
}
enum Unit
{
    Piece,
    Kg,
    L,
    ml,
    g
}
class MenuPosition{
    name: string;
    price: number;
    type: Type;
    description: string;
    product: Product[];

    constructor(name: string, price: number, type: Type, description: string, product: Product[]){
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.product = product;
    }
}
export default MenuPosition;