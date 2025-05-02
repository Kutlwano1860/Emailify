import React from 'react';
import './css/EmailDetail.css';
import {Email} from './EmailList';

interface EmailDetailProps {
    email:Email | null;
}

export const EmailDetail: React.FC<EmailDetailProps> = ({ email }) => {
    const formartDate =(datestring  : string) : string => {
        const option:Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(datestring).toLocaleDateString(undefined, option);
    };
    
    if (!email){
        return (
            <div className="empty-state">
                <i className= "fas fa-envelope-text open-text"></i>
                <p>select an email to read</p>
            </div>
        );
    }

    return (
        <div className="email-detail">
            <div className ="email-detail__header">
                <img src ={email.avatarUrL} alt= {`Avatar of ${email.sender}, a person with initials ${email.sender.split(' ').map(n => n[0]).join('')}`} className="avatar" />
                <div className ="email-info">
                <h2 className ="email-subject">{email.subject}</h2>
                <p className ="email-sender">{email.sender}</p>
                <p className ="email-date">{formartDate(email.date)}</p>
                </div>
            </div>
            <div className= "email-body">{email.body}
            </div>
        </div>
    );
};
