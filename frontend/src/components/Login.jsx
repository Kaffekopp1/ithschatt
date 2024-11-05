import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext";
export default function Login() {
	const navigate = useNavigate();
	const { setToken, setUser } = useContext(AuthContext);
	const loginSchema = z.object({
		username: z.string().min(1, "fyll i användare"),
		email: z.string().email("Det där är ingen emailadress"),
		password: z.string().min(1, "fyll i ditt lösenord")
	});
	const onSubmit = async (data) => {
		console.log("data", data.username);
		try {
			const response = await fetch("http://localhost:3000/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					username: data.username,
					email: data.email,
					password: data.password
				})
			});
			const answer = await response.json();
			console.log(answer);
			setToken(answer.token);
			setUser(data.username);
			navigate("/homepage");
		} catch (error) {
			alert("något gick fel");
			console.error("Error vid api fråga:", error);
		}
	};
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: "",
			email: "",
			password: ""
		}
	});

	return (
		<div className="flex flex-col items-center text-left justify-center min-h-screen bg-gray-100">
			<h1>Login</h1>

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
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
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
									<Input placeholder="Lösenord" {...field} />
								</FormControl>
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
