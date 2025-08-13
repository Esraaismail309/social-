import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { NavLink } from "react-router-dom";
import { AiOutlineGlobal } from "react-icons/ai";


export default function NavbarComponent() {
    return (
        <Navbar className="bg-gray-50">
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
                <NavbarItem >
                    <NavLink aria-current="page" to={'/about'}>
                        About
                    </NavLink>
                </NavbarItem>
                {/* <NavbarItem>
                    <Link color="foreground" to={''}>
                        Integrations
                    </Link>
                </NavbarItem> */}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <NavLink to={'/login'}>Login</NavLink>
                </NavbarItem>
                <NavbarItem>
                    <Button as={NavLink} color="primary" to={'/register'} variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
