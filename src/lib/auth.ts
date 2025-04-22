import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendEmail } from "./email";
import { nextCookies } from "better-auth/next-js";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb", // or "mysql", "postgresql", ...etc
    }),

emailAndPassword:{
    enabled: true,
    requireEmailVerification: true,

},
emailVerification:{
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async({user,token})=>{
        const verficicationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackUrl=${process.env.EMAIL_vERRIFIACATION_CALLBACK_URL}`;
         await sendEmail({
            to: user.email,
            subject: "Verify your email",
            text: `<a href="${verficicationUrl}">Click here to verify your email</a>`,

        }); 
    }
},

// this is the default adapter set the cookies 
plugins:[nextCookies()] //

});

