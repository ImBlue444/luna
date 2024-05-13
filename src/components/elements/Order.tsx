'use client'
import React, { useState } from 'react'
import { status } from '@/utils/enums/status'
import { differenceInDays } from "date-fns";


interface Order {
    activity: {
        ricezioneAlluminio: Activity;
        ricezioneVetri: Activity;
        taglio: Activity;
        lavorazione: Activity;
        assemblaggio: Activity;
        installazioneVetri: Activity;
        imballaggio: Activity;
        trasporto: Activity;
        consegnaInstallazione: Activity;
    };
    _id: string;
    orderName: string;
    materialShelf: string;
    priority: number;
    urgency: string;
    orderManager: string;
    __v: number;
}

interface Activity {
    expire: string;
    status: string;
    note: string;
    completed: string | null;
    activityManager: string;
}

type Props = {
    orderData: Order
}

const Order = (props: Props) => {

    const [RAstat, setRAstat] = useState(props.orderData.activity.ricezioneAlluminio.status);
    const [RVstat, setRVstat] = useState(props.orderData.activity.ricezioneVetri.status);
    const [TAGstat, setTAGstat] = useState(props.orderData.activity.taglio.status);
    const [LAVstat, setLAVstat] = useState(props.orderData.activity.lavorazione.status);
    const [ASSstat, setASSstat] = useState(props.orderData.activity.assemblaggio.status);
    const [IVstat, setIVstat] = useState(props.orderData.activity.installazioneVetri.status);
    const [IMstat, setIMstat] = useState(props.orderData.activity.imballaggio.status);
    const [TRAstat, setTRAstat] = useState(props.orderData.activity.trasporto.status);
    const [DELstat, setDELstat] = useState(props.orderData.activity.consegnaInstallazione.status);

    const handleChangeRAstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setRAstat(event.target.value);
    };
    const handleChangeRVstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setRVstat(event.target.value);
    };
    const handleChangeTAGstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setTAGstat(event.target.value);
    };
    const handleChangeLAVstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setLAVstat(event.target.value);
    };
    const handleChangeASSstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setASSstat(event.target.value);
    };
    const handleChangeIVstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setIVstat(event.target.value);
    };
    const handleChangeIMstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setIMstat(event.target.value);
    };
    const handleChangeTRAstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setTRAstat(event.target.value);
    };
    const handleChangeDELstat = (event: { target: { value: React.SetStateAction<string> } }) => {
        setDELstat(event.target.value);
    };


    const handleTargetLabel = (days: number) => {
        if (days < 0) {
            return (<button className='btn btn-error'>Ritardo</button>);
        } else if (days > 0) {
            return (<button className='btn btn-secondary'>Anticipo</button>);
        } else if (days === 0) {
            return (<button className='btn btn-info'>OK</button>);
        }
    };


    return (
        <div className=' border border-black py-4 px-8 mx-8 my-4 rounded-xl'>
            <div className='flex flex-col md:flex-row items-center md:justify-between text-center gap-4 mb-8'>
                <div>
                    <p onClick={() => console.log(differenceInDays(props.orderData.activity.ricezioneAlluminio.expire, new Date()))} className='font-bold'>Commessa</p>
                    <p className=' text-center text-2xl'>{props.orderData.orderName}</p>
                </div>
                <div>
                    <p className='font-bold'>Priorità</p>
                    <p className=' text-center text-2xl'>{props.orderData.urgency}</p>
                </div>
                <div>
                    <p className='font-bold'>Cronologico</p>
                    <p className=' text-center text-2xl'>{props.orderData.priority}</p>
                </div>
                <div>
                    <p className='font-bold'>Scaffa materiale</p>
                    <p className=' text-center text-2xl'>{props.orderData.materialShelf}</p>
                </div>
            </div>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className='border border-black'>
                                <th>Attività</th>
                                <th>Scadenza</th>
                                <th>Completato</th>
                                <th>Stato</th>
                                <th>Timer</th>
                                <th>Obbiettivo</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border border-black'>
                                <td>Ricezione Alluminio</td>
                                <td>{new Date(props.orderData.activity.ricezioneAlluminio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={RAstat} onChange={handleChangeRAstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.ricezioneAlluminio.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className="hover border border-black">
                                <td>Ricezione vetri</td>
                                <td>{new Date(props.orderData.activity.ricezioneVetri.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={RVstat} onChange={handleChangeRVstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.ricezioneVetri.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Taglio</td>
                                <td>{new Date(props.orderData.activity.taglio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={TAGstat} onChange={handleChangeTAGstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.taglio.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Lavorazione</td>
                                <td>{new Date(props.orderData.activity.lavorazione.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={LAVstat} onChange={handleChangeLAVstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.lavorazione.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Assemblaggio</td>
                                <td>{new Date(props.orderData.activity.assemblaggio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={ASSstat} onChange={handleChangeASSstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.assemblaggio.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Installazione vetri</td>
                                <td>{new Date(props.orderData.activity.installazioneVetri.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={IVstat} onChange={handleChangeIVstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.installazioneVetri.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Imballaggio</td>
                                <td>{new Date(props.orderData.activity.imballaggio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={IMstat} onChange={handleChangeIMstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.imballaggio.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Trasporto</td>
                                <td>{new Date(props.orderData.activity.trasporto.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={TRAstat} onChange={handleChangeTRAstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>{handleTargetLabel(differenceInDays(props.orderData.activity.trasporto.expire, new Date()))}</td>
                                <td>Note</td>
                            </tr>
                            <tr className='border border-black'>
                                <td>Consegna/Install.</td>
                                <td>{new Date(props.orderData.activity.consegnaInstallazione.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                <td>Completato</td>
                                <td>
                                    <select className='select select-bordered w-full max-w-xs' value={DELstat} onChange={handleChangeDELstat}>
                                        {status.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>Timer</td>
                                <td>
                                    {handleTargetLabel(differenceInDays(props.orderData.activity.consegnaInstallazione.expire, new Date()))}
                                </td>
                                <td>Note</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Order