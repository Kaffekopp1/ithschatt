import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>ChatApp</h1>
      <div>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/SignupForm')}>
          Create new account
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
