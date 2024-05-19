'use client'
import React, { useState, useEffect, FormEvent } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

type Props = {
    activity: string
    label: string
    id: string
}

const NoteModal = (props: Props) => {
    const [updatedData, setUpdatedData] = useState("");

    const notifySuccess = (text: string) => toast.success(text);
    const notifyError = (text: string) => toast.error(text);

    async function updateActivityNote(orderId: string, activityField: string, newNote: string) {
        try {
            // Costruisci l'URL della richiesta
            const url = `http://localhost:5000/orders/${orderId}/${activityField}`;

            // Dati da inviare nella richiesta
            const data = { note: newNote };

            // Esegui la richiesta PATCH utilizzando Axios
            const response = await axios.patch(url, data);

            // Restituisci i dati aggiornati
            return response.data;
        } catch (error) {
            // Gestisci gli errori
            console.error('Errore durante la richiesta PATCH:', error);
            throw error;
        }
    }

    return (
        <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <ToastContainer limit={1} />
            <dialog id={`modal_${props.activity}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{"Inserire nota per: "}  <b>{" " + props.label}</b></h3>
                    <div className='flex'>
                        <input
                            type="text"
                            placeholder="Nota..."
                            className="input input-bordered w-full max-w-xs mt-2"
                            value={updatedData}
                            onChange={(e) => setUpdatedData(e.target.value)} />
                        <button className='btn btn-success m-2  rounded-md' onClick={() => updateActivityNote(props.id, props.activity, updatedData)}>Invia</button>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-error rounded-lg">Chiudi</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default NoteModal