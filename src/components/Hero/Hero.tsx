import React from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import { usePathname } from 'next/navigation';


type Props = {
    userType: any,
}

const Hero = (props: Props) => {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <div>
            <div>
            </div>
            <div className='flex items-center mx-4'>
                {pathName != "/orders" ?
                    <button className='hover:bg-slate-200 rounded-xl' onClick={() => router.push("/orders")}><IoMdArrowRoundBack size={43} /></button>
                    : ""
                }
                <main>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight p-6">
                        {props.userType}
                    </h1>
                </main>
            </div>
            {props.userType === "Admin" ?
                <div className='flex flex-col gap-4 md:flex-row md:justify-evenly items-center my-4'>
                    <div>
                        <Link className={`btn btn-info rounded-lg ${pathName === "/aggiungi-commessa" ? "hover:btn-ghost" : ""}`} href={"/aggiungi-commessa"}>Aggiungi commessa</Link>
                    </div>
                    <div>
                        <Link className={`btn btn-warning rounded-lg ${pathName === "/modifica-commessa" ? "hover:btn-ghost" : ""}`} href={"/modifica-commessa"}>Gestisci commesse</Link>
                    </div>
                    <div>
                        <Link className={`btn btn-success rounded-lg ${pathName === "/archivio" ? "hover:btn-ghost" : ""}`} href={"/archivio"}>Archivio</Link>
                    </div>
                </div>
                : ""}
        </div>
    )
}

export default Hero