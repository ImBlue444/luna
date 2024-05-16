'use client'
import React, { useState, useEffect, FormEvent } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { workers } from '@/utils/enums/workers';
import axios from 'axios';

type Props = {}

const AddOrderForm = (props: Props) => {
    // Date states
    const [ricAllDate, setRicAllDate] = useState(new Date());
    const [ricVetDate, setVetAllDate] = useState(new Date());
    const [taglioDate, setTaglioDate] = useState(new Date());
    const [lavorazioneDate, setLavorazioneDate] = useState(new Date());
    const [assemblaggioDate, setAssemblaggioDate] = useState(new Date());
    const [instVetri, setInstVetriDate] = useState(new Date());
    const [imballaggioDate, setImballaggioDate] = useState(new Date());
    const [transportDate, setTransportDate] = useState(new Date());
    const [delivInstDate, setDelivInstDate] = useState(new Date());

    // Order states
    const [orderName, setOrderName] = useState("");
    const [materialShelf, setMaterialShelf] = useState("");
    const [urgency, seturgency] = useState("");
    const [priority, setPriority] = useState("");
    const [orderManager, setOrderManager] = useState("");

    //Activity states

    const [RAres, setRAres] = useState("");
    const [RVres, setRVres] = useState("");
    const [TAGRes, setTAGRes] = useState("");
    const [LAVres, setLAVres] = useState("");
    const [ASSres, setASSres] = useState("");
    const [IVres, setIVres] = useState("");
    const [IMres, setIMres] = useState("");
    const [TRAres, setTRAres] = useState("");
    const [DELres, setDELres] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:5000/orders', orderData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    const orderData = {
        orderName: orderName,
        materialShelf: materialShelf,
        priority: priority,
        urgency: urgency,
        orderManager: orderManager,
        activity: {
            ricezioneAlluminio: {
                expire: ricAllDate,
                activityManager: RAres,
            },
            ricezioneVetri: {
                expire: ricVetDate,
                activityManager: RVres,
            },
            taglio: {
                expire: taglioDate,
                activityManager: TAGRes,
            },
            lavorazione: {
                expire: lavorazioneDate,
                activityManager: LAVres,
            },
            assemblaggio: {
                expire: assemblaggioDate,
                activityManager: ASSres,
            },
            installazioneVetri: {
                expire: instVetri,
                activityManager: IVres,
            },
            imballaggio: {
                expire: imballaggioDate,
                activityManager: IMres,
            },
            trasporto: {
                expire: transportDate,
                activityManager: TRAres,
            },
            consegnaInstallazione: {
                expire: delivInstDate,
                activityManager: DELres,
            },
        },
    };


    return (
        <div>
            <div className='flex justify-center'>
                <h2 className=' my-8 text-4xl text-center text-pretty font-semibold'>Dati commessa</h2>
            </div>
            <form onSubmit={handleSubmit} >
                <div className='my-8 mx-8 flex justify-center flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-center'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold">Nome cliente / Numero commessa</span>
                        </div>
                        <input required onChange={(e) => setOrderName(e.target.value)} type="text" placeholder="Commessa..." className="input input-bordered w-full max-w-xs" />
                    </label>


                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold">Priorità</span>
                        </div>
                        <select value={urgency} onChange={e => seturgency(e.target.value)} required className="select select-bordered">
                            <option disabled>Seleziona priorità</option>
                            <option>Bassa</option>
                            <option>Media</option>
                            <option>Alta</option>
                            <option className=' font-semibold'>Urgente</option>
                        </select>
                    </label>


                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold">Cronologico</span>
                        </div>
                        <select value={priority} onChange={e => setPriority(e.target.value)} required className="select select-bordered">
                            <option disabled>Seleziona ordine</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text font-semibold">Scaffa stoccaggio</span>
                        </div>
                        <input required onChange={e => setMaterialShelf(e.target.value)} type="text" placeholder="Scaffa..." className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <h2 className=' my-8 text-4xl text-center text-pretty font-semibold'>Planner</h2>

                <div className='my-4 mx-4'>
                    <label className="form-control w-full max-w-xs my-8">
                        <div className="label">
                            <span className="label-text font-semibold">Responsabile commessa</span>
                        </div>
                        <select value={orderManager} onChange={e => setOrderManager(e.target.value)} required className="select select-xs md:select-md select-bordered">
                            <option disabled>Seleziona responsabile</option>
                            {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                        </select>
                    </label>

                    <table className="hidden md:table md:table-md table-xs md:text-xl">
                        <thead>
                            <tr>
                                <th><b>Attività</b></th>
                                <th><b>Scadenza</b></th>
                                <th><b>Responsabile</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ric. alluminio</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker calendarClassName='w-30' minDate={new Date()} selected={ricAllDate} onChange={(date: Date) => setRicAllDate(date)} />
                                </td>
                                <td>
                                    <select value={RAres} onChange={e => setRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Ric. vetri</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={ricVetDate} onChange={(date: Date) => setVetAllDate(date)} />
                                </td>
                                <td>
                                    <select value={RVres} onChange={e => setRVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Taglio</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={taglioDate} onChange={(date: Date) => setTaglioDate(date)} />
                                </td>
                                <td>
                                    <select value={TAGRes} onChange={e => setTAGRes(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Lavorazione</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={lavorazioneDate} onChange={(date: Date) => setLavorazioneDate(date)} />
                                </td>
                                <td>
                                    <select value={LAVres} onChange={e => setLAVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Assemblaggio</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={assemblaggioDate} onChange={(date: Date) => setAssemblaggioDate(date)} />
                                </td>
                                <td>
                                    <select value={ASSres} onChange={e => setASSres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Inst. vetri</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={instVetri} onChange={(date: Date) => setInstVetriDate(date)} />
                                </td>
                                <td>
                                    <select value={IVres} onChange={e => setIVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Imballaggio</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={imballaggioDate} onChange={(date: Date) => setImballaggioDate(date)} />
                                </td>
                                <td>
                                    <select value={IMres} onChange={e => setIMres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Trasporto</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={transportDate} onChange={(date: Date) => setTransportDate(date)} />
                                </td>
                                <td>
                                    <select value={TRAres} onChange={e => setTRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Consegna/Inst.</td>
                                <td className='cursor-pointer'>
                                    <ReactDatePicker minDate={new Date()} selected={delivInstDate} onChange={(date: Date) => setDelivInstDate(date)} />
                                </td>
                                <td>
                                    <select value={DELres} onChange={e => setDELres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                        <option disabled>Seleziona responsabile</option>
                                        {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className=' md:hidden flex flex-col gap-4'>
                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Ricezione alluminio</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker
                                                calendarClassName='w-30'
                                                minDate={new Date()}
                                                selected={ricAllDate}
                                                onChange={(date: Date) => setRicAllDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={RAres} onChange={e => setRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Ricezione vetri</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={ricVetDate} onChange={(date: Date) => setVetAllDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={RVres} onChange={e => setRVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Taglio</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={taglioDate} onChange={(date: Date) => setTaglioDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={TAGRes} onChange={e => setTAGRes(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Lavorazione</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={lavorazioneDate} onChange={(date: Date) => setLavorazioneDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={LAVres} onChange={e => setLAVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Assemblaggio</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={assemblaggioDate} onChange={(date: Date) => setAssemblaggioDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={ASSres} onChange={e => setASSres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Installazione vetri</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={instVetri} onChange={(date: Date) => setInstVetriDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={IVres} onChange={e => setIVres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Imballaggio</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={imballaggioDate} onChange={(date: Date) => setImballaggioDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={IMres} onChange={e => setIMres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Trasporto</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={transportDate} onChange={(date: Date) => setTransportDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={TRAres} onChange={e => setTRAres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className='border'>
                            <h2 className='text-center text-lg font-bold'>Consegna/Inst.</h2>
                            <table className=' table table-auto'>
                                <tbody>
                                    <tr>
                                        <td>Scadenza</td>
                                        <td>
                                            <ReactDatePicker minDate={new Date()} selected={delivInstDate} onChange={(date: Date) => setDelivInstDate(date)} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Responsabile</td>
                                        <td>
                                            <select value={DELres} onChange={e => setDELres(e.target.value)} required className="select select-xs md:select-md select-bordered">
                                                <option disabled>Seleziona responsabile</option>
                                                {workers.map((worker) => (<option key={worker.value} value={worker.value}>{worker.value}</option>))}
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center md:justify-end my-4 mr-10 gap-4'>
                    <button className='btn btn-warning rounded-xl'>Annulla</button>
                    <button type='submit' className='btn btn-info rounded-xl'>Aggiungi</button>
                </div>
            </form>
        </div>
    )
}

export default AddOrderForm