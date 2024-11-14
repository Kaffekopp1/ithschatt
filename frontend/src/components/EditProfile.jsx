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
import { useContext } from 'react';

const schema = z.object({
	username: z
		.string()
		.min(3, 'Användarnamnet måste vara minst 3 tecken')
		.or(z.string().length(0)),
	first_name: z.string().min(1, 'fyll i ditt förnamn').or(z.string().length(0)),
	last_name: z
		.string()
		.min(1, 'fyll i ditt efternamn')
		.or(z.string().length(0)),
	email: z
		.string()
		.email('Epost-adressen måste ha ett giltigt format')
		.or(z.string().length(0)),
});

export function EditProfile() {
	const { user, userId, userInfo, setUser, setUserInfo } =
		useContext(AuthContext);

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			username: user,
			email: userInfo.email,
			first_name: userInfo.firstname,
			last_name: userInfo.lastname,
		},
	});

	const updateProfile = async (data) => {
		try {
			const response = await fetch('/api/updateUserInfo', {
				// const response = await fetch('/api/updateUserInfo', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					userId: userId,
					username: data.username,
					email: data.email,
					firstName: data.first_name,
					lastName: data.last_name,
				}),
			});
			if (!response.ok) {
				const errorMessage = await response.json();
				console.error('Det går inte att ändra användaruppgifter', errorMessage);
				return;
			}

			const answer = await response.json();

			if (answer) {
				console.log('svar vid uppdatering av användar information', answer);
				setUser(answer.username);
				setUserInfo.firstname(answer.firstname);
				setUserInfo.lastname(answer.lastname);
				setUserInfo.username(answer.username);
				setUserInfo.email(answer.email);
			}
		} catch (error) {
			console.error('Det gick inte att uppdatera användaruppgifter:', error);
		}
	};

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
						<form
							onSubmit={form.handleSubmit(updateProfile)}
							className="grid py-4 "
						>
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
											{field.value && form.formState.errors.username && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="first_name"
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
											{form.formState.errors.first_name && (
												<FormMessage className="text-[0.6rem]" />
											)}
										</div>
									</FormItem>
								)}
							/>
							<FormField
								className="grid grid-cols-4 items-center"
								control={form.control}
								name="last_name"
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
											{form.formState.errors.last_name && (
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
											<Input className="col-span-3" type="email" {...field} />
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
