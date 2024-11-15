import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import AuthContext from '../AuthContext';
import { useContext } from 'react';

const WelcomePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-center">ChatApp</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          {user ? null : (
            <Button onClick={() => navigate('/login')} variant="outline">
              Login
            </Button>
          )}
          <Button onClick={() => navigate('/SignupForm')} variant="outline">
            Create new account
          </Button>
          <Button onClick={() => navigate('/homepage')} variant="outline">
            Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomePage;
