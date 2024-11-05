// import { useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignupForm() {
  const schema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  });

  const onSubmit = async (data) => {
    console.log('data', data.username);
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });
      const answer = await response.json();
      console.log(answer);
    } catch (error) {
      alert('något gick fel');
      console.error('Error vid api fråga:', error);
    }
  };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const passwordValue = form.watch('password');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Användarnamn</FormLabel>
                <FormControl>
                  <Input placeholder="Användarnamn" {...field} />
                </FormControl>
                <FormDescription>
                  Ditt namn är den mest grundläggande och kraftfulla delen av
                  din identitet. — Okänd
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mailadress</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="du@exempel.com" {...field} />
                </FormControl>
                <FormDescription>
                  Vi kommer sälja denna mailadress till spamföretag
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lösenord</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  {passwordValue.length >= 8
                    ? 'Du har angivit lösenord: Hunter22'
                    : 'Lösenordet måste vara minst 8 tecken långt'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
