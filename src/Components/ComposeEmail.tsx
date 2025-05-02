import React, {useState} from 'react';

export const ComposeEmail: React.FC < {onsend: (subject: string, body: string) => void }> = ({onsend}) => {
 const [subject, setSubject] = useState('');
 const [body, setBody] = useState('');

  const handlesend = () => {
    onsend(subject, body);
    setSubject('');
    setBody('');
  };

  return(
    <div className = "compose-email">
        <input 
        type="text"
        placeholder="subject"
        value={subject}
        onChange={(e) => setSubject (e.target.value)}
        />
        <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setSubject (e.target.value)}
        />
        <button onClick ={handlesend}>send</button>
    </div>
  );
};