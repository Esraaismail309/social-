import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Switch } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";
import { useContext } from "react";
import { CounterContext } from "../../Context/CounterContext";
import { AuthContext } from "../../Context/AuthContext";


export default function NavbarComponent({ handleDarkMood }) {


    let { userToken, setUserToken } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUserToken('')


        navigate('/login');



    }

    return (
        <Navbar className="bg-gray-50 dark:bg-gray-600 dark:text-white ">
            <NavbarBrand >
                <AiOutlineGlobal className="mx-2" />
                <p className="font-bold text-inherit">SOCIAL</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <NavLink color="foreground" to={'/'}>
                        Home
                    </NavLink>
                </NavbarItem>
                {userToken && <>


                    <NavbarItem >
                        <NavLink aria-current="page" to={'/about'}>
                            About
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to={'/posts'}>
                            Posts
                        </NavLink>
                    </NavbarItem>
                    <NavbarItem>
                        <NavLink to={'/profile'}>
                            Profile
                        </NavLink>
                    </NavbarItem>
                </>}
            </NavbarContent>
            <NavbarContent justify="end">
                {
                    !userToken ? <>

                        <NavbarItem className="hidden lg:flex">
                            <NavLink to={'/login'}>Login</NavLink>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={NavLink} color="primary" to={'/register'} variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </> :
                        <NavbarItem>
                            <Button onClick={handleLogout} as={Button} color="primary" variant="flat">
                                LogOut
                            </Button>
                        </NavbarItem>
                }


                <Switch
                    defaultSelected
                    className="text-black"
                    color="secondary"
                    size="lg"
                    thumbIcon={({ isSelected, }) =>
                        isSelected ? 'li' : 'da'
                    }
                    onChange={handleDarkMood}
                >
                    Dark mode
                </Switch>
            </NavbarContent>
        </Navbar>
    );
}
