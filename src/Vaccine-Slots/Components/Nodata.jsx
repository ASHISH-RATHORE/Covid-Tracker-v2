import React from 'react';
import {Empty} from 'antd';



function Nodata() {

const contentStyle={
  display:'flex',
  justifyContent:'center',
  height:'auto',
    marginTop:100,
}

    return (
        <div style={contentStyle} >
          <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <span>
      No Centers Found
      </span>
    }
  >
    
  </Empty>  
        </div>
    )
}

export default React.memo(Nodata)