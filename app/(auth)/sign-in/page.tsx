"use client" //is a directive in Next.js that tells Next.js to treat a component as a Client Component, meaning it can use client-side React features and browser APIs.

import { SignInCard } from "@/features/auth/components/sign-in-card";

const SignInPage = () => {
    return(
        <SignInCard />
    )
}

export default SignInPage;