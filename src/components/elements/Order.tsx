'use client'
import React, { useEffect, useState } from 'react'
import { status } from '@/utils/enums/status'
import { differenceInDays } from "date-fns";
import { IoIosMail } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { intlFormatDistance, isPast } from "date-fns";
import Timer from './Timer';
import NoteModal from './NoteModal';
import { changeStatus, completeActivity } from '@/utils/libs/crud';
import { ToastContainer, toast } from 'react-toastify';
import Progress from './OrderElements/Progress';
import axios from 'axios';

interface Order {
    activity: {
        [key: string]: Activity;
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
    note?: string;
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
    const router = useRouter();

    const [RAstat, setRAstat] = useState(props.orderData.activity.ricezioneAlluminio.status);
    const [RVstat, setRVstat] = useState(props.orderData.activity.ricezioneVetri.status);
    const [TAGstat, setTAGstat] = useState(props.orderData.activity.taglio.status);
    const [LAVstat, setLAVstat] = useState(props.orderData.activity.lavorazione.status);
    const [ASSstat, setASSstat] = useState(props.orderData.activity.assemblaggio.status);
    const [IVstat, setIVstat] = useState(props.orderData.activity.installazioneVetri.status);
    const [IMstat, setIMstat] = useState(props.orderData.activity.imballaggio.status);
    const [TRAstat, setTRAstat] = useState(props.orderData.activity.trasporto.status);
    const [DELstat, setDELstat] = useState(props.orderData.activity.consegnaInstallazione.status);


    const getCompletedActivitiesCount = (orderData: Order): number => {
        let completedCount = 0;
        Object.values(orderData.activity).forEach((activity) => {
            if (activity.completed && new Date(activity.completed) instanceof Date && !isNaN(new Date(activity.completed).getTime())) {
                completedCount++;
            }
        });
        return completedCount;
    };

    const archiveOrder = () => {
        axios.post(`${process.env.NEXT_PUBLIC_LUNA_BASE_URL}/archive/${props.orderData._id}`)
    }


    const handleChangeRAstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'ricezioneAlluminio')
            changeStatus(props.orderData._id, 'ricezioneAlluminio', event.target.value)
            setRAstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'ricezioneAlluminio', event.target.value)
            setRAstat(event.target.value);
        }
    };
    const handleChangeRVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'ricezioneVetri')
            changeStatus(props.orderData._id, 'ricezioneVetri', event.target.value)
            setRVstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'ricezioneVetri', event.target.value)
            setRVstat(event.target.value);
        }
    };
    const handleChangeTAGstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'taglio')
            changeStatus(props.orderData._id, 'taglio', event.target.value)
            setTAGstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'taglio', event.target.value)
            setTAGstat(event.target.value);
        }
    };
    const handleChangeLAVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'lavorazione')
            changeStatus(props.orderData._id, 'lavorazione', event.target.value)
            setLAVstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'lavorazione', event.target.value)
            setLAVstat(event.target.value);
        }
    };
    const handleChangeASSstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'assemblaggio')
            changeStatus(props.orderData._id, 'assemblaggio', event.target.value)
            setASSstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'assemblaggio', event.target.value)
            setASSstat(event.target.value);
        }
    };
    const handleChangeIVstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'installazioneVetri')
            changeStatus(props.orderData._id, 'installazioneVetri', event.target.value)
            setIVstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'installazioneVetri', event.target.value)
            setIVstat(event.target.value);
        }
    };
    const handleChangeIMstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'imballaggio')
            changeStatus(props.orderData._id, 'imballaggio', event.target.value)
            setIMstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'imballaggio', event.target.value)
            setIMstat(event.target.value);
        }
    };
    const handleChangeTRAstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'trasporto')
            changeStatus(props.orderData._id, 'trasporto', event.target.value)
            setTRAstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'trasporto', event.target.value)
            setTRAstat(event.target.value);
        }
    };
    const handleChangeDELstat = (event: { target: any }) => {
        if (event.target.value === 'Completato') {
            completeActivity(props.orderData._id, 'consegnaInstallazione')
            changeStatus(props.orderData._id, 'consegnaInstallazione', event.target.value)
            setDELstat(event.target.value);
            window.location.reload();
        } else {
            changeStatus(props.orderData._id, 'consegnaInstallazione', event.target.value)
            setDELstat(event.target.value);
        }
    };

    const handleUrgency = () => {
        if (props.orderData.urgency === 'Alta') {
            return ("border-red-500");
        } else if (props.orderData.urgency === 'Media') {
            return ("border-yellow-500");
        } else if (props.orderData.urgency === 'Bassa') {
            return ("border-blue-500");
        } else if (props.orderData.urgency === 'Urgente') {
            return ("border-red-500");
        }
    }


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

            <div className=' card my-2 py-2 px-6 mx-6 rounded-xl md:text-lg bg-slate-100 border border-black'>
                <div className={`flex flex-col md:flex-row items-center md:justify-between text-center gap-4 mb-8 rounded-xl p-4 border-4 ${handleUrgency()}`}>
                    <div>
                        <p className='font-bold'>Commessa</p>
                        <p className=' text-center text-lg'>{props.orderData.orderName}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Priorità</p>
                        <p className=' text-center text-lg'>{props.orderData.urgency}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Cronologico</p>
                        <p className=' text-center text-lg'>{props.orderData.priority}</p>
                    </div>
                    <div>
                        <p className='font-bold'>Scaffa materiale</p>
                        <p className=' text-center text-lg'>{props.orderData.materialShelf}</p>
                    </div>
                </div>
                <div>
                    <div className="overflow-x-auto">
                        <table className="table table-sm text-center text-md md:text-lg">
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
                                    <td className="font-semibold">Ricezione Alluminio</td>
                                    <td>{new Date(props.orderData.activity.ricezioneAlluminio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.ricezioneAlluminio.completed ? new Date(props.orderData.activity.ricezioneAlluminio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : '--'}</td>
                                    <td>
                                        <select disabled={RAstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={RAstat} onChange={handleChangeRAstat}>
                                            <option className={`${RAstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.ricezioneAlluminio.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Ricezione vetri</td>
                                    <td>{new Date(props.orderData.activity.ricezioneVetri.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.ricezioneVetri.completed ? new Date(props.orderData.activity.ricezioneVetri.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={RVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={RVstat} onChange={handleChangeRVstat}>
                                            <option className={`${RVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.ricezioneVetri.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Taglio</td>
                                    <td>{new Date(props.orderData.activity.taglio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.taglio.completed ? new Date(props.orderData.activity.taglio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={TAGstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={TAGstat} onChange={handleChangeTAGstat}>
                                            <option className={`${TAGstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.taglio.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Lavorazione</td>
                                    <td>{new Date(props.orderData.activity.lavorazione.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.lavorazione.completed ? new Date(props.orderData.activity.lavorazione.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={LAVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={LAVstat} onChange={handleChangeLAVstat}>
                                            <option className={`${LAVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.lavorazione.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Assemblaggio</td>
                                    <td>{new Date(props.orderData.activity.assemblaggio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.assemblaggio.completed ? new Date(props.orderData.activity.assemblaggio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={ASSstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={ASSstat} onChange={handleChangeASSstat}>
                                            <option className={`${ASSstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.assemblaggio.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Installazione vetri</td>
                                    <td>{new Date(props.orderData.activity.installazioneVetri.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.installazioneVetri.completed ? new Date(props.orderData.activity.installazioneVetri.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={IVstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={IVstat} onChange={handleChangeIVstat}>
                                            <option className={`${IVstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.installazioneVetri.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Imballaggio</td>
                                    <td>{new Date(props.orderData.activity.imballaggio.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.imballaggio.completed ? new Date(props.orderData.activity.imballaggio.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={IMstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={IMstat} onChange={handleChangeIMstat}>
                                            <option className={`${IMstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.imballaggio.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Trasporto</td>
                                    <td>{new Date(props.orderData.activity.trasporto.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.trasporto.completed ? new Date(props.orderData.activity.trasporto.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={TRAstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={TRAstat} onChange={handleChangeTRAstat}>
                                            <option className={`${TRAstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.trasporto.expire} /> : ""}</td>
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
                                    <td className="font-semibold">Consegna/Install.</td>
                                    <td>{new Date(props.orderData.activity.consegnaInstallazione.expire).toLocaleDateString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</td>
                                    <td>{props.orderData.activity.consegnaInstallazione.completed ? new Date(props.orderData.activity.consegnaInstallazione.completed).toLocaleString('it-IT', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }) : "--"}</td>
                                    <td>
                                        <select disabled={DELstat === 'Completato' ? true : false} className='select select-bordered w-full max-w-xs' value={DELstat} onChange={handleChangeDELstat}>
                                            <option className={`${DELstat != "Standby" ? "hidden" : ""}`} value={"Standby"}>Standby</option>
                                            {status.map((status, index) => (
                                                <option key={index} value={status.value}>{status.label}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='max-w-28'>{props ? <Timer targetDate={props.orderData.activity.consegnaInstallazione.expire} /> : ""}</td>
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
                <div className='flex justify-between items-center center my-4'>
                    <Progress progressValue={getCompletedActivitiesCount(props.orderData)} />
                    <button disabled={getCompletedActivitiesCount(props.orderData) >= 9 ? false : true} onClick={() => archiveOrder()} className={`btn btn-success rounded-lg w-1/4 shadow-xl`}>Archivia</button>
                </div>
            </div>
        </>
    )
}

export default Order