import { Router, Request, Response } from "express";

import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { UserErrors } from "../errors";
import { ProductErrors } from "../errors";
import { verifyToken } from "./user";

const router = Router();

// get items in store from mongo db
router.get("/", verifyToken, async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.json({ products });
  } catch (err) {
    res.json({ err });
  }
});

// get items added to cart for checkout page - processes a user's purchase
router.post(
  "/checkout",
  verifyToken,
  async (req: Request, res: Response):Promise<void> => {
    // id and cart items come in with request
    const { customerID, cartItems } = req.body;

    // find user by id, find id's of all cart items
    // get full product array
    try {
      const user = await UserModel.findById(customerID);
      const productIDs = Object.keys(cartItems);
      const products = await ProductModel.find({ _id: { $in: productIDs } }); // finds all products whose _id is in the productIDs array
      // if can't find user, return 400 error
      if (!user) {
        return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      // if lengths dont equal, return 400 error
      if (products.length !== productIDs.length) {
        res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
        return;
      }
      let totalPrice = 0;
      for (const item in cartItems) {
        const product = products.find(
          (product) => String(product._id) === item
        );

        if (!product) {
          res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
          return;
        }

        if (product.stockQuantity < cartItems[item]) {
          return res.status(400).json({
            type: ProductErrors.NOT_ENOUGH_STOCK,
          });
        }
        totalPrice += product.price * cartItems[item];

        if (user.availableMoney < totalPrice) {
          res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
          return;
        }

        user.availableMoney -= totalPrice;
        user.purchasedItems.push(...productIDs);

        await user.save();
        await ProductModel.updateMany(
          { _id: { $in: productIDs } },
          { $inc: { stockQuantity: -1 } } // update each item's stock quantity to -1 of what it was
        );
      }
      res.json({ purchasedItems: user.purchasedItems });
    } catch (err) {
      res.status(400).json({ err });
    }
  }
);

router.get(
  "/purchased-items:customerID",
  verifyToken,
  async (req: Request, res: Response) => {
    const { customerID } = req.params;
    try {
      const user = await UserModel.findById(customerID);
      if (!user) {
        res.status(400).json({ type: UserErrors.NO_USER_FOUND });
      }
      const products = await ProductModel.find({
        _id: { $in: user?.purchasedItems },
      });
      res.json({ purchasedItems: products });
    } catch (err) {
      res.status(400).json({ type: ProductErrors.NO_USERS_FOUND });
    }
  }
);

export { router as productRouter };
