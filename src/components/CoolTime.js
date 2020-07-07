import React from 'react';
import moment from 'moment';
import { useToggle } from '../effects';

export default function CoolTime({ time }) {
  const [relative, toggle] = useToggle(true);

  return <small className="time" onClick={toggle}>
           {relative
            ? moment(time).fromNow()
            : moment(time).format('llll')}
         </small>;
}
