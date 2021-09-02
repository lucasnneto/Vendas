import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
interface IResquest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductsService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IResquest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError("Product not found.");
    }
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError("There us already on product with this name");
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await productsRepository.save(product);
    return product;
  }
}
export default UpdateProductsService;
