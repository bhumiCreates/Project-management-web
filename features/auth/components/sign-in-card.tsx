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

const formSchema = z.object({
    email: z.string().trim().min(1, "Required").email(),
    password: z.string(),
});

export const SignInCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


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
                    <form className="space-y-4">
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <Field>
                                    <Input required
                                        {...field}
                                        type="email"
                                        placeholder="Enter your email address"
                                        disabled={false}
                                    />
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
        </Card>
    )
}