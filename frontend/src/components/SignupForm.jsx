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
import { Checkbox } from '@/components/ui/checkbox';

import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SignupForm() {
  const schema = z.object({
    username: z.string().min(3, 'Användarnamnet måste vara minst 3 tecken'),
    firstName: z.string().min(1, 'Fyll i ditt förnamn'),
    lastName: z.string().min(1, 'Fyll i ditt efternamn'),
    email: z.string().email('Epost-adressen måste ha ett giltigt format'),
    password: z.string().min(8, 'Lösenordet måste vara minst 8 tecken'),
    adress: z.string().max(50, 'Adressen får vara högst 50 tecken'),
    postalnr: z.string().max(5, 'Ogiltigt postnummer'),
    consent: z.boolean(),
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
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          adress: data.adress,
          postalnr: data.postalnr,
          consent: data.consent,
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
      firstName: '',
      lastName: '',
      adress: '',
      postalnr: '',
      consent: false,
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
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Förnamn</FormLabel>
                <FormControl>
                  <Input placeholder="Förnamn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Efternamn</FormLabel>
                <FormControl>
                  <Input placeholder="Efternamn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Gata 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postalnr"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postnummer</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="12345" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email-address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="du@exempel.com" {...field} />
                </FormControl>
                <FormDescription>
                  Vi kommer sälja denna email-address till spamföretag
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
                    ? 'Du har angivit lösenord: Hunter2'
                    : ''}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="consent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox {...field} />
                </FormControl>
                <FormLabel>
                  Kryssa i rutan om du vill ha informationsbrev skickade till
                  din hemaddress.
                </FormLabel>
                <FormDescription>Läs om GDPR här</FormDescription>
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
