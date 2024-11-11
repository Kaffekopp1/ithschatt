import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AuthContext from '../AuthContext';
import { useContext, useEffect } from 'react';

const schema = z.object({
	username: z.string().min(3, 'Användarnamnet måste vara minst 3 tecken'),
	firstName: z.string().min(1, 'fyll i ditt förnamn'),
	lastName: z.string().min(1, 'fyll i ditt efternamn'),
	email: z.string().email('Epost-adressen måste ha ett giltigt format'),
	password: z.string().min(8, 'Lösenordet måste vara minst 8 tecken'),
	ssn: z.string().min(12, 'felaktigt personnr'),
});

export function EditProfile() {
	const { user, userId } = useContext(AuthContext);

	const onSubmit = (data) => {
		console.log('Data:', data);
	};

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			username: user,
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			ssn: '',
		},
	});

	useEffect(() => {
		if (user) {
			form.reset({
				username: user,
				email: user.email,
			});
		}
	}, [user, form]);

	// const passwordValue = form.watch("password");

	console.log('userId :>> ', userId);
	useEffect(() => {
		console.log('user :>> ', user);
	});

	return (
		user && (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">Edit Profile</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[485px] max-w-[485px]">
					<DialogHeader>
						<DialogTitle>Edit profile</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you are done.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="grid py-4 ">
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1">
										<FormLabel className="text-right">Användarnamn</FormLabel>
										<FormControl className="grid-cols-4">
											<Input className="col-span-3 " type="text" {...field} />
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs"
											style={{ minHeight: '1rem' }}
										>
											{form.formState.errors.username && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="firstName"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1">
										<FormLabel className="text-right">Förnamn</FormLabel>
										<FormControl className="grid-cols-4">
											<Input className="col-span-3" type="text" {...field} />
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs "
											style={{ minHeight: '1rem' }}
										>
											{form.formState.errors.firstName && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="lastName"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1">
										<FormLabel className="text-right">Efternamn</FormLabel>
										<FormControl className="grid-cols-4 ">
											<Input className="col-span-3" type="text" {...field} />
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs "
											style={{ minHeight: '1rem' }}
										>
											{form.formState.errors.lastName && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="ssn"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1">
										<FormLabel className="text-right">Personnummer</FormLabel>
										<FormControl className="grid-cols-4 ">
											<Input className="col-span-3" type="number" {...field} />
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs "
											style={{ minHeight: '1rem' }}
										>
											{form.formState.errors.ssn && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1">
										<FormLabel className="text-right">Mailadress</FormLabel>
										<FormControl className="grid-cols-4">
											<Input
												className="col-span-3"
												type="email"
												// defaultValue={email}
												{...field}
											/>
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs "
											style={{ minHeight: '1rem' }}
										>
											{form.formState.errors.email && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem className="grid grid-cols-4 items-center gap-x-4 space-y-1 mb-4">
										<FormLabel className="text-right">Lösenord</FormLabel>
										<FormControl className="grid-cols-4">
											<Input
												className="col-span-3"
												type="password"
												placeholder="••••••••"
												{...field}
											/>
										</FormControl>
										<div className="text-right"></div>
										<div
											className="col-span-3 m-0 text-xs c"
											style={{ minHeight: '1.5rem' }}
										>
											{form.formState.errors.password && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<DialogFooter>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		)
	);
}
