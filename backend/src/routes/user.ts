import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser, UserModel } from "../models/user";
import { UserErrors } from "../errors";

const router = Router();

// register
router.post("/register", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

//login
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    // compare password to hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
    }

    // if valid, assign a token
    const token = jwt.sign({ id: user._id }, "secret");
    res.json({ token, userID: user._id });
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// middleware
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log('auth header', authHeader);
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err) => {
      if (err) {
        console.log('token verification failed', err)
        return res.sendStatus(403);
      }
      console.log('token verified successfully')
      next();
    });
  } else {
    console.log('no auth header provided')
    res.sendStatus(401);
  }
};

export { router as userRouter };
