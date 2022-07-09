import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../lib/prisma";
// import Payment from "../../../../../"
//import controller
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(async (req, res) => {
  const userID = req.query.id as string;
  const userPayment = {
    payment: payment,
    user: User,
  };
  const getPayment = await prisma.payment.findMany({
    where: {
      status: "Income",
      userId: Number(userID),
    },
  });
  const getUser = await prisma.user.findUnique({
    where: {
      user_id: Number(userID),
    },
  });

  return res.json(getPayment);
});
export default handler;
