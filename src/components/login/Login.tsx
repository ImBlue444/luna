'use client'
import React, { useState, useEffect, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../logo.jpg'


type Props = {}

const Login = (props: Props) => {
    const router = useRouter();
    const notify = (text: string) => toast.error(text);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name === "admin" && password === "admin") {
            router.push("/orders")
        } else notify("Credenziali errate")

    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <ToastContainer limit={1} />
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Benvenuto!</h1>
                    <h2 className="text-2xl font-bold">Inserisci i tuoi dati per accedere...</h2>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Nome</span>
                            </label>
                            <input type="text" placeholder="Nome" className="input input-bordered" required onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input type="password" placeholder="Password" className="input input-bordered" required onChange={(e) => setPassword(e.target.value)} />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Accedi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login