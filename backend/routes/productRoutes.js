import expres from "express";
import { createProduct , getProducts ,getProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = expres.Router();

router.get("/" , getProducts);
router.get("/" , getProduct);
router.post("/" , createProduct);
router.put("/" , updateProduct);
router.delete("/" , deleteProduct);

export default router;