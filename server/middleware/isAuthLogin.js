import jwt from "jsonwebtoken";
import LoginDatasModel from "../models/loginDatasModel.js";

const isAuthLogin = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  console.log(authHeader);
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res
      .status(401)
      .json(
        "개인 블로그 입니다. contact 페이지에서 관리자 한테 먼저 문의 주세요~"
      );
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_Secret_Key, async (error, decoded) => {
    if (error) {
      return res
        .status(401)
        .json(
          "개인 블로그 입니다. contact 페이지에서 관리자 한테 먼저 문의 주세요~"
        );
    }
    const user = await LoginDatasModel.findById(decoded.data._id);
    if (!user) {
      return res
        .status(401)
        .json(
          "개인 블로그 입니다. contact 페이지에서 관리자 한테 먼저 문의 주세요~"
        );
    }
  });
  next();
};

export default isAuthLogin;
