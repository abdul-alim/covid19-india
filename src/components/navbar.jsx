import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const navLinkProps = (path, animationDelay) => ({
    className: `${window.location.pathname === path ? 'focused' : ''}`,
    style: {
        animationDelay: `${animationDelay}s`,
    },
});

function Navbar({pages}) {
    const [expand, setExpand] = useState(false);
    return (
        <nav className="flex items-center flex-wrap bg-white text-primary py-2">
            <div className="container py-2 px-2 items-center font-bold text-lg">
                <div className="w-full flex items-center justify-between -my-2">
                    <NavLink exact={true} to='/' className="flex items-center cursor-pointer lg:flex">
                        <img
                            src="/images/covid.svg"
                            alt="logo"
                            className="h-10 w-auto mr-3"
                        />
                        <div className="text-xl font-bold text-black text-primary">
                            COVID-19 India
                            <span className="text-red-600 uppercase live-txt blink">
                                Live
                            </span>
                        </div>
                    </NavLink>
                    <div className="flex ml-auto mr-1">
                        {pages.map((page, i) => {
                            if (page.showInNavbar === true) {
                                return (
                                    <NavLink
                                        exact={true}
                                        to={page.pageLink}
                                        key={i}
                                        className={
                                            'mx-1 px-3 py-4 hidden lg:block nav-link'
                                        }
                                        activeClassName={
                                            'relative nav-link-active'
                                        }
                                    >
                                        <span
                                            {...navLinkProps(
                                                page.pageLink,
                                                page.animationDelayForNavbar
                                            )}
                                        >
                                            {page.displayName}
                                        </span>
                                    </NavLink>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
