import { sql } from "../../config/db.js";

// 1. Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;
        console.log("fetched products", products);
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in getProducts function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// 2. Create product
export const createProduct = async (req, res) => {
    const { name, price, image } = req.body; // تصحيح: req.body بدلاً من res.body

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING *
        `; // تصحيح كلمة RETURNING
        
        console.log("new product added: ", newProduct);
        res.status(201).json({ success: true, data: newProduct[0] });
    } catch (error) {
        console.log("Error in createProduct function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// 3. Get single product by ID
export const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await sql`
            SELECT * FROM products WHERE id=${id}
        `;

        if (product.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product[0] }); // تصحيح اسم المتغير product
    } catch (error) {
        console.log("Error in getProduct function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// 4. Update product by ID
export const updateProduct = async (req, res) => {
    const { id } = req.params; // تصحيح: أخذ الـ id من req.params
    const { name, price, image } = req.body;

    try {
        const updatedProduct = await sql`
            UPDATE products 
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `;

        if (updatedProduct.length === 0) { // تصحيح: updatedProduct.length
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({ success: true, data: updatedProduct[0] }); // إضافة Response عند النجاح
    } catch (error) {
        console.log("Error in updateProduct function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// 5. Delete product by ID
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await sql`
            DELETE FROM products WHERE id=${id} RETURNING *
        `;

        if (deletedProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully", data: deletedProduct[0] }); // إضافة Response عند النجاح
    } catch (error) {
        console.log("Error in deleteProduct function", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};