'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // o da qualsiasi altra sorgente
        if (!token) {
            router.push('/');
        } else {
            axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/auth`, {
                token: token
            })
                .then(function (response) {
                    response.status === 200 ? setAuthenticated(true) : setAuthenticated(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
            // Effettua la tua logica di verifica del token qui
            // Esegui una chiamata API per verificare la validità del token o qualsiasi altra logica
            // Ad esempio, potresti inviare il token al backend e verificare se è valido
            // Questo è solo un esempio di logica di verifica, devi adattarlo alle tue esigenze
            if (!authenticated) {
                router.push('/');
            } else {
                setAuthenticated(true);
            }
        }
    }, [authenticated]);

    return authenticated ? children : null;
};

export default AuthGuard;
