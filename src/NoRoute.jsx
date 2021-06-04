import React from 'react';
import { Result, Button } from 'antd';
import {Link} from 'react-router-dom';

function NoRoute() {
    return (
        <div>
<Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to='/'>Back Home</Link>}
  />
        </div>
    )
}

export default NoRoute
