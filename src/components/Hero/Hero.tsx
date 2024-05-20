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
            <div className='mb-2'>
                {props.userType === "Admin" ?
                    <div role="tablist" className="tabs tabs-lifted md:tabs-lg">
                        <div role="tab" className={`tab cursor-default ${pathName === "/orders" ? "tab-active [--tab-bg:#A9CCE3] font-bold" : ""} md:text-xl`}>
                            <Link href={"/orders"}>Ordini</Link>
                        </div>
                        <div role="tab" className={`tab cursor-default ${pathName === "/aggiungi-commessa" ? "tab-active [--tab-bg:#BAA8D2] font-bold" : ""} md:text-xl`}>
                            <Link href={"/aggiungi-commessa"}>Aggiungi</Link>
                        </div>
                        <div role="tab" className={`tab cursor-default ${pathName === "/modifica-commessa" ? "tab-active [--tab-bg:#FFE8B4] font-bold" : ""} md:text-xl`}>
                            <Link href={"/modifica-commessa"}>Gestisci</Link>
                        </div>
                        <div role="tab" className={`tab cursor-default ${pathName === "/archivio" ? "tab-active [--tab-bg:#A2D9BA] font-bold" : ""}text-sm md:text-xl`}>
                            <Link href={"/archivio"}>Archivio</Link>
                        </div>
                    </div>
                    : ""}
            </div>
        </div>

    )
}

export default Hero