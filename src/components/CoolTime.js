import React, { useState } from 'react';
import moment from 'moment';

export default function CoolTime({ time }) {
  const [relative, setRelative] = useState(true);

  return <small onClick={() => setRelative(!relative)}>
           {relative
            ? moment(time).fromNow()
            : moment(time).format('llll')}
         </small>;
}
