import React from 'react'

type Props = {
    status: string
}

const Steps = (props: Props) => {
    if (props.status === "pending") {
        return (
            <ul className="steps my-4">
                <li className="step step-primary"><b>In attesa</b></li>
                <li className="step">In corso</li>
                <li className="step">Completato</li>
                <li className=" hidden">Annullato</li>
            </ul>
        )
    }
    else if (props.status === "processing") {
        return (
            <ul className="steps my-4">
                <li className="step step-primary">In attesa</li>
                <li className="step step-primary"><b>In corso</b></li>
                <li className="step">Completato</li>
                <li className="step hidden">Annullato</li>
            </ul>
        )
    }
    else if (props.status === "delivered") {
        return (
            <ul className="steps my-4">
                <li className="step step-primary">In attesa</li>
                <li className="step step-primary">In corso</li>
                <li className="step step-primary"><b>Completato</b></li>
                <li className="step hidden">Annullato</li>
            </ul>
        )
    }
    else if (props.status === "shipped") {
        return (
            <ul className="steps my-4">
                <li className="step step-error">In attesa</li>
                <li className="step step-error">In corso</li>
                <li className="step step-error">Completato</li>
                <li className="step step-error"><b>Annullato</b></li>
            </ul>
        )
    }
    else if (props.status === "loading") {
        return (
            <div className='flex justify-center'>
                <ul className="steps my-4">
                    <div className='loading loading-spinner loading-sm'></div>
                </ul>
            </div>
        )
    }
}

export default Steps