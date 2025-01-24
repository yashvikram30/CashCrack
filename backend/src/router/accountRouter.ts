import { Router } from "express";
import { authMiddleware } from '../middlewares/authMiddleware';
import { User } from "../db/userModel";
import { Account } from "../db/bankModel";
import mongoose from "mongoose";
export const accountRouter = Router();

accountRouter.get("/balance",authMiddleware, async(req,res)=>{
    //@ts-ignore
    const username = req.userId;
    const user = await User.findOne({
        username
    })
    if(!user){
        res.json({
            message : "User not found"
        })
        return;
    }
    const userId = user._id;

    const userAccount = await Account.findOne({
        userId: userId
    })
    // actually no need to write this, each user will definitely have an account
    if(!userAccount){
        res.json({
            message: "Account does not exist"
        })
        return;
    }

    res.json({
        username: user.username,
        balance : userAccount.balance
    })
});

accountRouter.post('/transfer',authMiddleware,async(req,res)=>{

    const session = await mongoose.startSession();

    // we are now starting the transaction. During transaction, either all of the code is executed and the changes are made or none of it is executed and no changes are made
    session.startTransaction();
    const { to,amount } = req.body; // here to should be the username, remember that!

    // Step:1 checking if the user who sent the request exists or not
    // @ts-ignore
    const username = req.userId;
    const user = await User.findOne({
        username
    }).session(session)
    if(!user){
        await session.abortTransaction();
        res.status(400).json({
            message : "User does not exist"
        })
        return;
    }

    const userAccount = await Account.findOne({
        userId: user._id
    }).session(session)

    if(!userAccount){
        await session.abortTransaction();
        res.status(400).json({
            message : "User account does not exist"
        })
        return;
    }

    const fromUserId = user._id;

    // Step:2 checking if the user to which the money is to be sent exists
    const toUser = await User.findOne({
        username: to
    }).session(session)

    if(!toUser){
        await session.abortTransaction();
        res.status(400).json({
            message : "To user not found"
        })
        return;
    }

    const toUserId = toUser._id;

    // Step:3 checking if the user has sufficient balance to send the money
    if(userAccount.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient account balance"
        })
        return;
    }

    // Step:4 perform the money transfer transaction
    await Account.updateOne({
        // @ts-ignore
        userId: fromUserId,
    },{
        $inc:{balance: -amount}
    }).session(session)

    await Account.updateOne({
        userId: toUserId
    },{
        $inc: {balance: amount}
    }).session(session)

    // this command will finally end the given transaction
    await session.commitTransaction();

    res.json({
        message : "Transaction completed"
    })
    
})
