//文章中的图片以此宫格样式显示
import React, { useEffect,useState } from 'react';
import { Row, Col } from 'antd';

export default function Gongge(props) {
    var img=[],num,width,height;
    for(var j in props.cimg){
        img.push(props.cimg[j]);
    }
    if(img.length === 1){
      num = 16;
      width = 60 + 'vw';
      height = 'auto';
    }else if(img.length === 2 || img.length === 4){
      num = 12;
      width = 45 + 'vw';
      height = 45 + 'vw';
    }else{
      num = 8;
      width = 30 + 'vw';
      height = 30 + 'vw';
    }
    return (
        <div>
          <Row>
            {
              img.map((item,index)=>(
                <Col span={num} key={index}><img src={item} onClick={()=>{window.location.href=item}} style={{width:width,height:height,objectFit:'cover'}}/></Col>
              ))
            }
          </Row>
        </div>
    )
}