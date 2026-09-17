import expres from "express";
import { createProduct , getProducts ,getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = expres.Router();

router.get("/" , getProducts);
router.get("/:id" , getProduct);
router.post("/" , createProduct);
router.put("/:id" , updateProduct);
router.delete("/:id" , deleteProduct);

export default router;