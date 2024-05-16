'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Hero from '../hero/Hero'

type Props = {}

const Sidebar = (props: Props) => {
    const pathName = usePathname();
    if (pathName !== "/") {
        return (
            <div>
                <div className="drawer z-50">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col">
                        {/* Navbar */}
                        <div className="w-full navbar bg-base-200">
                            <div className="flex-none lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                                </label>
                            </div>
                            <div className="flex-1 items-center">
                                <Link href={"/orders"} className="btn btn-ghost text-xl rounded-lg">Luna</Link>

                            </div>
                            {pathName === "/" ? "" :
                                <div className="flex-none hidden lg:block">
                                    <ul className="menu menu-horizontal">
                                        {/* Navbar menu content here */}
                                        <li><Link href={"/orders"}>Supporto</Link></li>
                                        <li><Link href={"/"}>Esci</Link></li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                    {pathName === "/" ? "" :
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className="menu p-4 w-80 min-h-full bg-base-200">
                                {/* Sidebar content here */}
                                <li><Link href={"/orders"}>Supporto</Link></li>
                                <li><Link href={"/"}>Esci</Link></li>
                            </ul>
                        </div>
                    }
                </div>
                <Hero userType={"Admin"} />
            </div>

        )
    }
}

export default Sidebar