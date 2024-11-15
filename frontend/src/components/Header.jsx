import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import AuthContext from '../AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
import { EditProfile } from './EditProfile';

function Header() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	return (
		<header className="flex items-center justify-between p-4 border-b z-1">
			<div className="flex-1 text-center">
				<h1 className="text-xl font-semibold">ChatApp</h1>
			</div>
			<NavigationMenu>
				<NavigationMenuList className="flex items-center space-x-4 w-200">
					<NavigationMenuItem>
						{/* <NavigationMenuLink
							onClick={() => navigate('/testsida')}
							className="cursor-pointer"
							>
							TestSida
						</NavigationMenuLink> */}
						<NavigationMenuTrigger
							onClick={() => {
								if (!user) {
									navigate('/login');
								}
							}}
						>
							{user ? user : 'Login'}
						</NavigationMenuTrigger>
						{user && (
							<NavigationMenuLink onClick={() => navigate('/bildgalleri')}>
								bildgalleri
							</NavigationMenuLink>
						)}
						<NavigationMenuContent>
							{user && <EditProfile />}
							<NavigationMenuLink
								onClick={() => navigate('/settings')}
								className="cursor-pointer"
							>
								Settings
							</NavigationMenuLink>
							<NavigationMenuLink> {user && <Logout />}</NavigationMenuLink>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}

export default Header;
