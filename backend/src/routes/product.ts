import { Router, Request, Response } from 'express';

import { IProduct, ProductModel } from '../models/product';
import { UserErrors } from '../errors';

const router = Router();

router.get("/", async (_, res: Response) => {
    try {
        const products = await ProductModel.find({})
        res.json({ products });
    } catch (err) {
        res.json ({ err })
    }
});

export { router as productRouter};