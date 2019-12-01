import React, { Component } from 'react';
import { NavBar,List } from 'antd-mobile';
import { Row, Col } from 'antd';

// import fanhui from '../images/返回 (1).png';
import touxiang from '../images/头像.png';
import xiangqing from '../images/详情.png';
import shoucang from '../images/收藏（1）.png';
import xiangce from '../images/相册.png';
import kaquan from '../images/卡券.png';
import huishouzhan from '../images/回收站.png';
import shezhi from '../images/设置.png';
import renwu from '../images/小人.png';

const Item = List.Item;
const Brief = Item.Brief;
const user = {
    photo:`${touxiang}`,
    name:'我最美丽啦啦啦啦',
    infor:'我也不知道说些什么',
    cloth:'35',
    article:'14',
    like:'241',
    concern:'123'
}

export default class Me extends Component {
    constructor(){
        super();
    }

    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }

    render() {
        return (
            <div style={{width:'100%',height:"100%",background:"url("+renwu+") bottom center no-repeat"}}>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                // leftContent={[
                //     <img src={fanhui} style={{width:'30px'}} key="fan"/>
                // ]}
                >个人</NavBar>

                <div className="userMessage" style={{width:"100%",overflow:"auto",zoom:"1",padding:"0 5%",marginTop:"20px"}}>
                    <img src={user.photo} alt="" style={{float:"left",width:"20%",borderRadius:"50%",marginRight:"3%"}}/>
                    <div className="userMessCenter" style={{float:"left",width:"70%"}}>
                        <h2>{user.name}</h2>
                        <h4>简介：{user.infor}</h4>
                    </div>
                    <a onClick={()=>{this.hrefChange('aboutme')}}><img src={xiangqing} alt="" style={{float:"left",width:"7%",padding:"7% 0"}}/></a>
                </div>

                <div className="gutter-example" style={{width:"100%",textAlign:'center',marginTop:"5px",}}>
                    <Row gutter={20} style={{margin:"0 3%",borderTop:"2px solid #ddd"}}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h4>{user.cloth}</h4><h4>衣服</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h4>{user.article}</h4><h4>发帖</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h4>{user.like}</h4><h4>点赞</h4></div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box"><h4>{user.concern}</h4><h4>关注</h4></div>
                        </Col>
                    </Row>
                </div>

                <List style={{borderTop:"5px solid #ddd",borderBottom:"5px solid #ddd",padding:"0 3%"}}>
                    <Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={shoucang}
                    arrow="horizontal"
                    onClick={() => {}}
                    >收藏</Item>
                    <Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={xiangce}
                    onClick={() => {}}
                    arrow="horizontal"
                    >相册</Item>
                    <Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={kaquan}
                    onClick={() => {}}
                    arrow="horizontal"
                    >卡券</Item>
                    <Item
                    style={{borderBottom:"1px solid #ddd"}}
                    thumb={huishouzhan}
                    onClick={() => {}}
                    arrow="horizontal"
                    >回收站</Item>
                    <Item
                    thumb={shezhi}
                    onClick={()=>{this.hrefChange('setup')}}
                    arrow="horizontal"
                    >设置</Item>
                </List>
            </div>
        );
    }
}