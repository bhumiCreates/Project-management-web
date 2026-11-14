import { DottedSeparator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Field,
    FieldError
} from "@/components/ui/field";

import { Controller, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import Link from "next/link";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Required"),
});

export const SignInCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (values:z.infer<typeof formSchema>) =>{
        console.log({values})
    }


    return (
        <Card className="w-full h-full md:w-121.5 border-none shadow-none ">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Welcome back
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7">
                <Field {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field,fieldState }) => (
                                <Field>
                                    <Input required
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email address"
                                        disabled={false}
                                    />
                                    {fieldState.error && (
                                        <FieldError>
                                            {fieldState.error.message}
                                        </FieldError>
                                    )}
                                </Field>

                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field,fieldState }) => (
                                <Field>
                                    <Input required
                                        {...field}
                                        type="password"
                                        placeholder="Enter your password"
                                        disabled={false}
                                    />
                                    {fieldState.error && (
                                        <FieldError>
                                            {fieldState.error.message}
                                        </FieldError>
                                    )}
                                    
                                </Field>
                                
                            )}
                        />

                        <Button disabled={false} size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Field>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    variant="secondary"
                    disabled={false}
                    size="lg"
                    className="w-full">
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button
                    variant="secondary"
                    disabled={false}
                    size="lg"
                    className="w-full">
                    <FaGithub className="mr-2 size-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeparator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Don&apos;t have an account?
                    <Link href="/sign-up">
                    <span className="text-blue-700">&nbsp;Sign up</span>
                    </Link>
                </p>

            </CardContent>
        </Card>
    )
}