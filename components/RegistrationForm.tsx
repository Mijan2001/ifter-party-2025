'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import RegistrationTable from './RegistrationTable';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    targetName: z.string().min(2, 'Target name must be at least 2 characters'),
    moneyAmmount: z
        .string()
        .min(3, 'Money amount must be at least 3 characters'),
    txnNumber: z
        .string()
        .min(5, 'Transaction number must be at least 5 characters'),
    mobileNumber: z.string().regex(/^01\d{9}$/, 'Invalid mobile number format')
});

export default function RegistrationForm() {
    const [showTable, setShowTable] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            targetName: '',
            moneyAmmount: '',
            txnNumber: '',
            mobileNumber: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(
                'https://unique-seahorse-d6680d.netlify.app/api/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }
            );

            const data = await response.json();

            if (response.ok) {
                toast.success('Registration successful!');
                form.reset();
            } else {
                toast.error(data.message || 'Registration failed');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>নিজের নাম</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Example: Mijanur Rahman"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="targetName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>যার কাছে টাকা জমা দিয়েছি</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Example: Sirajul Islam"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="moneyAmmount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>টাকার পরিমান(খরচ ছাড়া)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Example: 500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="txnNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>বিকাশ/নগদের Txn Number</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Example: 400"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>নিজের মোবাইল নাম্বার</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Example: 01712345678"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4">
                        <Button type="submit">SUBMIT REGISTRATION</Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowTable(!showTable)}
                        >
                            {showTable ? 'HIDE' : 'DISPLAY'}
                        </Button>
                    </div>
                </form>
            </Form>

            {showTable && <RegistrationTable />}
        </div>
    );
}
