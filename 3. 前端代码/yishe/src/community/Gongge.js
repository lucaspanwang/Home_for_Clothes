import React, { useEffect,useState } from 'react';
import { Row, Col } from 'antd';

export default function Gongge(props) {
    var img=[],num,width;
    for(var j in props.cimg){
        img.push(props.cimg[j]);
    }
    if(img.length === 1){
      num = 24;
      width = 90;
    }else if(img.length === 2 || img.length === 4){
      num = 12;
      width = 45;
    }else{
      num = 8;
      width = 30;
    }
    return (
        <div>
          <Row>
            {
              img.map((item)=>(
                <Col span={num}><img src={item} onClick={()=>{window.location.href=item}} style={{ padding:"1px",width:width+'vw',height:width+'vw',objectFit:'cover'}}/></Col>
              ))
            }
          </Row>
        </div>
    )
}