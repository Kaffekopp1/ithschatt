import { useContext } from 'react';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { setUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUser('');
    setToken('');
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
