'use client'
import React, { useState } from 'react'
import { status } from '@/utils/enums/status'
import { differenceInDays } from "date-fns";
import { IoIosMail } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";

import { intlFormatDistance, isPast } from "date-fns";
import NoteModal from './NoteModal';
import { changeStatus } from '@/utils/libs/crud';
import { FaPlusCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

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

    const handleChangeRAstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'ricezioneAlluminio', event.target.value)
        setRAstat(event.target.value);
    };
    const handleChangeRVstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'ricezioneVetri', event.target.value)
        setRVstat(event.target.value);
    };
    const handleChangeTAGstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'taglio', event.target.value)
        setTAGstat(event.target.value);
    };
    const handleChangeLAVstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'lavorazione', event.target.value)
        setLAVstat(event.target.value);
    };
    const handleChangeASSstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'assemblaggio', event.target.value)
        setASSstat(event.target.value);
    };
    const handleChangeIVstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'installazioneVetri', event.target.value)
        setIVstat(event.target.value);
    };
    const handleChangeIMstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'imballaggio', event.target.value)
        setIMstat(event.target.value);
    };
    const handleChangeTRAstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'trasporto', event.target.value)
        setTRAstat(event.target.value);
    };
    const handleChangeDELstat = (event: { target: any }) => {
        changeStatus(props.orderData._id, 'consegnaInstallazione', event.target.value)
        setDELstat(event.target.value);
    };


    const handleTargetLabel = (days: number) => {
        if (days < 0) {
            return (<button className=' w-full btn rounded-xl btn-error'>Ritardo</button>);
        } else if (days > 0) {
            return (<button className=' w-full btn rounded-xl btn-accent'>Anticipo</button>);
        } else if (days === 0) {
            return (<button className=' w-full btn rounded-xl btn-info'>OK</button>);
        }
    };


    return (
        <>
            <ToastContainer style={{ zIndex: 9999 }} autoClose={3000} pauseOnHover={false} toastClassName={"z-10"} limit={1} />
            <NoteModal note={props.orderData.activity.ricezioneAlluminio.note} id={props.orderData._id} label='Ricezione alluminio' activity='ricezioneAlluminio' />
            <NoteModal note={props.orderData.activity.ricezioneVetri.note} id={props.orderData._id} label='Ricezione vetri' activity='ricezioneVetri' />
            <NoteModal note={props.orderData.activity.taglio.note} id={props.orderData._id} label='Taglio' activity='taglio' />
            <NoteModal note={props.orderData.activity.lavorazione.note} id={props.orderData._id} label='Lavorazione' activity='lavorazione' />
            <NoteModal note={props.orderData.activity.assemblaggio.note} id={props.orderData._id} label='Assemblaggio' activity='assemblaggio' />
            <NoteModal note={props.orderData.activity.installazioneVetri.note} id={props.orderData._id} label='Installazione vetri' activity='installazioneVetri' />
            <NoteModal note={props.orderData.activity.imballaggio.note} id={props.orderData._id} label='Imballaggio' activity='imballaggio' />
            <NoteModal note={props.orderData.activity.trasporto.note} id={props.orderData._id} label='Trasporto' activity='trasporto' />
            <NoteModal note={props.orderData.activity.consegnaInstallazione.note} id={props.orderData._id} label='Consegna e/o installazione' activity='consegnaInstallazione' />

            <div className=' card my-4 py-4 px-8 mx-8 rounded-xl md:text-3xl bg-slate-100 border border-black'>
                <div className='flex flex-col md:flex-row items-center md:justify-between text-center gap-4 mb-8 rounded-xl p-4 border border-black '>
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
                        <table className="table table-auto text-center text-md md:text-xl">
                            <thead>
                                <tr className='text-lg font-bold text-center'>
                                    <th>Attività</th>
                                    <th>Scadenza</th>
                                    <th>Completato</th>
                                    <th>Stato</th>
                                    <th>Timer</th>
                                    <th>Obbiettivo</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>



                                <tr className='hover:bg-slate-300  border-b-2 border-black'>
                                    <td>Ricezione Alluminio</td>
                                    <td>{new Date(props.orderData.activity.ricezioneAlluminio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={RAstat} onChange={handleChangeRAstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.ricezioneAlluminio.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.ricezioneAlluminio.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.ricezioneAlluminio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAlluminio') as HTMLDialogElement | null)?.showModal(); }} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => { (document.getElementById('modal_ricezioneAlluminio') as HTMLDialogElement | null)?.showModal(); }} size={32} />}
                                        </div>
                                    </td>
                                </tr>





                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td>Ricezione vetri</td>
                                    <td>{new Date(props.orderData.activity.ricezioneVetri.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={RVstat} onChange={handleChangeRVstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{props ? intlFormatDistance(props.orderData.activity.ricezioneVetri.expire, new Date(), { "locale": "it" }) : ""}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.ricezioneVetri.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.ricezioneVetri?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_ricezioneVetri') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_ricezioneVetri') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>




                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td>Taglio</td>
                                    <td>{new Date(props.orderData.activity.taglio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={TAGstat} onChange={handleChangeTAGstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.taglio.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.taglio.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.taglio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_taglio') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_taglio') as HTMLDialogElement | null)?.showModal()} size={32} />}
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td>Lavorazione</td>
                                    <td>{new Date(props.orderData.activity.lavorazione.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={LAVstat} onChange={handleChangeLAVstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.lavorazione.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.lavorazione.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.lavorazione?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_lavorazione') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_lavorazione') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }</div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td>Assemblaggio</td>
                                    <td>{new Date(props.orderData.activity.assemblaggio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={ASSstat} onChange={handleChangeASSstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.assemblaggio.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.assemblaggio.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.assemblaggio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_assemblaggio') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_assemblaggio') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td>Installazione vetri</td>
                                    <td>{new Date(props.orderData.activity.installazioneVetri.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={IVstat} onChange={handleChangeIVstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.installazioneVetri.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.installazioneVetri.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {
                                                props?.orderData?.activity?.installazioneVetri?.note?.trim() !== '' ?
                                                    <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_installazioneVetri') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                    <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_installazioneVetri') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black'>
                                    <td>Imballaggio</td>
                                    <td>{new Date(props.orderData.activity.imballaggio.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={IMstat} onChange={handleChangeIMstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.imballaggio.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.imballaggio.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.imballaggio?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_imballaggio') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_imballaggio') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td>Trasporto</td>
                                    <td>{new Date(props.orderData.activity.trasporto.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={TRAstat} onChange={handleChangeTRAstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.trasporto.expire, new Date(), { "locale": "it" })}</td>
                                    <td>{handleTargetLabel(differenceInDays(props.orderData.activity.trasporto.expire, new Date()))}</td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.trasporto?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_trasporto') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_trasporto') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>



                                <tr className='hover:bg-slate-300 border-b-2 border-black '>
                                    <td>Consegna/Install.</td>
                                    <td>{new Date(props.orderData.activity.consegnaInstallazione.expire).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                                    <td>Data completato</td>
                                    <td>
                                        <select className='select select-bordered w-full max-w-xs' value={DELstat} onChange={handleChangeDELstat}>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>{intlFormatDistance(props.orderData.activity.consegnaInstallazione.expire, new Date(), { "locale": "it" })}</td>
                                    <td>
                                        {handleTargetLabel(differenceInDays(props.orderData.activity.consegnaInstallazione.expire, new Date()))}
                                    </td>
                                    <td>
                                        <div>
                                            {props?.orderData?.activity?.consegnaInstallazione?.note?.trim() !== '' ?
                                                <IoIosMail className='cursor-pointer' onClick={() => (document.getElementById('modal_consegnaInstallazione') as HTMLDialogElement | null)?.showModal()} size={32} /> :
                                                <IoMailOutline className='cursor-pointer' onClick={() => (document.getElementById('modal_consegnaInstallazione') as HTMLDialogElement | null)?.showModal()} size={32} />
                                            }
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>
    )
}

export default Order