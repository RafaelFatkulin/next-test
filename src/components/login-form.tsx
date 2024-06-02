'use client'

import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    email: z.string().email('Поле "Email" не должно быть пустым'),
    password: z
        .string()
        .min(5, 'Минимальная длина пароля - 5 символов')
        .max(5, 'Максимальная длина пароля - 5 символов')
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
    const {toast} = useToast()
    const router = useRouter()

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    async function onSubmit(values: FormData) {
        try {
            const response = await fetch('/api/login', {
                method: "POST",
                body: JSON.stringify(values),
                cache: 'force-cache',
            })
            const responseData = await response.json()
            if(!response.ok) {
                throw new Error(responseData.error)
            }

            router.push('/')
        } catch(err) {
            toast({
                title: 'Ошибка',
                description: err.message
            })
        }
    }

    return (
        <Card className="mx-auto max-w-sm border-0 sm:border">
            <CardHeader>
                <CardTitle className="text-2xl">Логин</CardTitle>
                <CardDescription>
                    Введите ваш email и пароль для в входа в аккаунт
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="user@user.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Пароль</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="*****"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
