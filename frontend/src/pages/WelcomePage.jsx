import { useNavigate } from "react-router-dom";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent
} from "../components/ui/card";
import { Button } from "../components/ui/button";

const WelcomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-80">
				<CardHeader>
					<CardTitle className="text-center">ChatApp</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col items-center">
					<Button onClick={() => navigate("/login")} variant="outline">
						Login
					</Button>
					<Button onClick={() => navigate("/SignupForm")} variant="outline">
						Create new account
					</Button>
					<Button onClick={() => navigate("/homepage")} variant="outline">
						homepage
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default WelcomePage;
