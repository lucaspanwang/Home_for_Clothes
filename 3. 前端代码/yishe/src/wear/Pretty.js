import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge,NavBar } from 'antd-mobile';
import mote from '../images/模特.png';
import weixin from '../images/wechat.png'
import './wear.css';
const tabs = [
    { title: <Badge>发型</Badge> },
    { title: <Badge>瞳色</Badge> },
    { title: <Badge>眼镜</Badge> },
  ];
export default class Pretty extends Component {
    render() {
        return (
            <div>
              {/* 头 */}
              <NavBar style={{backgroundColor:'#fc9d9a',color:'white'}}>穿搭</NavBar>
              {/* 模特脸 */}
              <div>
                  {/* <img src={mote}/> */}
              </div>
              <div>
                <Tabs tabs={tabs}
                    initialPage={1}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                <div style={{height: '150px', backgroundColor: '#fff' }}>
                   <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                    <div className="pretty1">
                       <img src={weixin} style={{width:'100%'}}/>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of second tab
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of third tab
                </div>
                </Tabs>
                <WhiteSpace />
              </div>
            </div>
        )
    }
}
