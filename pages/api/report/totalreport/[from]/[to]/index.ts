import { Payment } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import prisma from "../../../../../../lib/prisma";
//import controller
interface OBJ{
    payments: Payment[],
    total: number,
    type: string
}
const handler = nextConnect<NextApiRequest, NextApiResponse>();
handler.get(
    async (req, res) => {
        const from = req.query.from as string;
        const to = req.query.to as string;
        let paymentArr: number[] = [];
        let expenseArr: number[] = [];

        const getPaymentByDate = await prisma.payment.findMany({
            where: {
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
                status: "Income",
            }
        })
        getPaymentByDate?.map((item: Payment) => {
            paymentArr.push(item.amount);
        })
        const sumOfIncome = paymentArr.reduce((a, b) => a + b, 0);


        const getExpenseByDate = await prisma.payment.findMany({
            where: {
                date: {
                    gte: new Date(from),
                    lte: new Date(to),
                },
                status: "Expense",
            }
        })
        getExpenseByDate?.map((item: Payment) => {
            expenseArr.push(item.amount);
        })
        const sumOfExpense = expenseArr.reduce((a, b) => a + b, 0);
        const total = sumOfIncome - sumOfExpense;
        return res.json({
            payments: getPaymentByDate,
            expenses: getExpenseByDate,
            sumOfIncome: sumOfIncome,
            sumOfExpense: sumOfExpense,
            total: total
        })
        
    }
)
export default handler;