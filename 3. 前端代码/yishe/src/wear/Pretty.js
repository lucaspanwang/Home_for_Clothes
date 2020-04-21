import React, { Component } from 'react'
import { Tabs, WhiteSpace, Badge,NavBar} from 'antd-mobile';
import {Link} from 'react-router-dom';
import Back from '../images/返回 (1).png';
import AlphaPicker from 'react-color'
import './wear.css';
//图片导入
import pre1 from '../images/pre1.png'
import t0 from '../images/t0.png'
import t1 from '../images/t1.png'
import t2 from '../images/t2.png'
import t3 from '../images/t3.png'
import t4 from '../images/t4.png'
import t5 from '../images/t5.png'
import t6 from '../images/t6.png'
import y1 from '../images/y1.png'
import y2 from '../images/y2.png'
import y3 from '../images/y3.png'
import y4 from '../images/y4.png'
import e1 from '../images/e1.png'
const tabs = [
    { title: <Badge>发型</Badge> },
    { title: <Badge>瞳色</Badge> },
    { title: <Badge>眼镜</Badge> },
];
const hair = [t0,t1,t2,t3,t4,t5,t6]
const glasses = [y1,y2,y3,y4]
const eye = [e1]
export default class Pretty extends Component {
    constructor(){
        super();
        this.state = {
            index:0,
            index2:-1,
            index3:-1,
            color:'',
            color2:'',
            count:0,//点击次数
        }
      }   
    num=(idx)=>{
        this.setState({
            index:idx
        })
    }
    num2=(idx)=>{
        this.setState({
            index2:idx
        })
    }
    num3=(idx)=>{
        this.setState({
            index3:idx
        })
    }
    lalala=()=>{//换发色的点击事件
        document.getElementById('imgpick').style.display='block';
        // document.getElementById('mote_3').style.display='block';
        // document.getElementById('mote_3').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
        // document.getElementById('mote_3').style.opacity=0.9
        console.log(this)
        this.state.count++;//判断点击几次
        var a = setTimeout(()=>{
          if(this.state.count>1){//双击
            document.getElementById('imgpick').style.display='none';
            this.setState({
              count:0
            })
          }
        }) 
      }
    huance=()=>{
        this.setState({
          color:document.getElementById('imgpick').childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value
        })
        console.log(document.getElementById('imgpick').childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].value)
        // document.getElementById('mote_3').style.filter=`drop-shadow(150px 0 ${this.state.color})`;
        // document.getElementById('mote_3').style.opacity=0.9
      }
    render() {
        return (
            <div>
            {/* 头 */}
                <NavBar
                    leftContent={
                        <Link to={"/apptab/"+this.props.match.params.id}>
                            <img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}>穿搭</NavBar>

              {/* 模特脸 */}
              <div className="m1" onClick={this.lalala}>
                  {/* 依次是：模特本身、发型、瞳色、眼镜 */}
                  <img src={pre1} style={{width:'100%'}}/>
                  <img src={eye[this.state.index2]} id="t2"/>
                  <img src={glasses[this.state.index3]} id="t3"/>
                  <img src={hair[this.state.index]} id="t0"/>
              </div>
            {/* <CompactPicker/> */}
                          <div id="imgpick">
                <AlphaPicker
                style={{width:'50px'}}
                id="imgpick2" color={this.state.color} onChange={this.huance}/>
              </div>
              <div>
                <Tabs tabs={tabs}
                    initialPage={1}
                    onChange={(tab, index) => { console.log('onChange', index, tab); }}
                    onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                >
                {/* 换发型 */}
                <div style={{height: '150px', backgroundColor: '#fff' }}>
                    {
                          hair.map((item,idx)=>(
                            <div key={idx} className="pretty1" onClick={this.num.bind(this,idx)}>
                                <img className="pretty2" src={item} style={{width:'100%'}}/>
                            </div>
                          ))
                        }
                </div>
                <div style={{ height: '150px', backgroundColor: '#fff' }}>
                    {/* 瞳色 */}
                    {
                          eye.map((item,idx)=>(
                            <div key={'2'+idx} className="pretty1" onClick={this.num2.bind(this,idx)}>
                                <img className="pretty3" src={item} style={{width:'100%'}}/>
                            </div>
                          ))
                        }
                </div>
                <div style={{ height: '150px', backgroundColor: '#fff' }}>
                    {/* 眼镜 */}
                    {
                          glasses.map((item,idx)=>(
                            <div key={'3'+idx}  className="pretty1" onClick={this.num3.bind(this,idx)}>
                                <img className="pretty3" src={item} style={{width:'100%'}}/>
                            </div>
                          ))
                        }
                </div>
                </Tabs>
                <WhiteSpace />
              </div>
            </div>
        )
    }
}
