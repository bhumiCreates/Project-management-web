import { DottedSeparator } from "@/components/dotted-seperator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

const formSchema = z.object({
    name:z.string().trim().min(1,"Required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Minimum of 8 characters required"),
});

export const SignUpCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            email: "",
            password: "",
        },
    })

    const onSubmit = (values:z.infer<typeof formSchema>) =>{
        console.log({values})
    }

    return (
        <Card className="w-full h-full md:w-121.5 border-none shadow-none ">
            <CardHeader className="items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By siging up, you agree to our {" "}
                    <Link href="/privacy">
                    <span className="text-blue-700">Privacy Policy
                    </span>
                    </Link>{" "} and {" "}
                    <Link href="/terms">
                    <span className="text-blue-700">Terms of Service
                    </span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeparator /> 
            </div>
            <CardContent className="p-7">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field,fieldState }) => (
                                <Field>
                                    <Input required
                                        {...field}
                                        type="text"
                                        placeholder="Enter your Username"
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
                            Sign Up
                        </Button>
                    </form>
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
                    <FcGoogle className="mr-2 size-5"/>
                    Sign Up with Google
                </Button>
                <Button 
                variant="secondary"
                disabled={false}
                size="lg"
                className="w-full">
                    <FaGithub className="mr-2 size-5" />
                    Sign Up with Github
                </Button>
            </CardContent>
        </Card>
    )
}