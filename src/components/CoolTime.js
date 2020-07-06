import React, { useState } from 'react';
import moment from 'moment';

export default function CoolTime({ time }) {
  const [relative, setRelative] = useState(true);

  return <small className="time" onClick={() => setRelative(!relative)}>
           {relative
            ? moment(time).fromNow()
            : moment(time).format('llll')}
         </small>;
}
