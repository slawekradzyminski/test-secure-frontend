import React, { useState } from 'react'
import { userActions } from "../_actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Input } from "./common/Input";
import { getHandleChange } from "./util/change";
import { DisabledInput } from "./common/DisabledInput";
import { PrimaryButton } from "./common/PrimaryButton";
import { Textarea } from "./common/Textarea";
import { Email } from '../types';

function EmailComponent() {

    let userToEdit = JSON.parse(localStorage.getItem('userToEdit'));
    const dispatch = useDispatch();
    const [to, setTo] = useState(userToEdit.email)
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        setSubmitted(true)
        const email: Email = { to, subject, message }
        dispatch(userActions.handleEmail(email));
    };

    if (to === undefined) {
        return (
            <div className="col-lg-8 offset-lg-2">
                <h2>Something is no yes...</h2>
                <Link to="/" className="btn btn-link">Go back</Link>
            </div>
        );
    }

    return (
        <div className="col-lg-8 offset-lg-2">
            <h2>Email user</h2>
            {to &&
                <form name="form" onSubmit={sendEmail}>
                    <DisabledInput name="email" value={to} />
                    <Input name="subject" value={subject} submitted={submitted}
                        handleChange={getHandleChange(setSubject)} />
                    <Textarea name="message" value={message} submitted={submitted}
                        handleChange={getHandleChange(setMessage)} />
                    <div className="form-group">
                        <PrimaryButton text="Send email" isLoading={false} />
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            }
        </div>
    );
}

export { EmailComponent };