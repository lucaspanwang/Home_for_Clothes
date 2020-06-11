import React, { Component } from 'react';
import { Accordion, List } from 'antd-mobile';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/fanhui_1.png';

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8084/home',
            //记录图片路径
            pictureSummer:[],
            pictureString:[],
            pictureWinter:[],
            num:-1,
            result:'',//搜索标记那个是红标
            kai:'0',
            item:'',//标题
            jump:''//跳转红标
        }
    }
    //图片删除
    deleteItem=(item,that)=>{
        if(this.state.pictureSummer.includes(item)){
            var index=this.state.pictureSummer.indexOf(item)
            var p=this.state.pictureSummer;
            p.splice(index,1)
            console.log(p)
            this.setState({
                pictureSummer:p
            })
        }
        if(this.state.pictureString.includes(item)){
            var index=this.state.pictureString.indexOf(item)
            var p=this.state.pictureString;
            p.splice(index,1)
            this.setState({
                pictureString:p
            })
        }
        if(this.state.pictureWinter.includes(item)){
            var index=this.state.pictureWinter.indexOf(item);
            var p=this.state.pictureWinter;
            p.splice(index,1)
            this.setState({
                pictureWinter:p
            })
        }
        
        fetch('http://47.98.163.228:3003/delete',{
            method: 'post',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({cloPic:item,userId:this.props.match.params.id})
        })
    }    
    componentDidMount(){
        //标题显示
        fetch('http://47.98.163.228:3003/place/'+this.props.match.params.id)
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                item:res[0].placeOne
            })
            // console.log('标题显示'+res[0].placeOne)
        })
        //图片显示
        fetch('http://47.98.163.228:3003/picture', {
        method: 'post',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId:this.props.match.params.id,
          whereId:"1"
        })
      })
      .then((res)=>res.json())
      .then((res)=>{
        //   console.log('新的图片路径：'+res.picString)
        this.setState({
            pictureString:res.picString,
            pictureSummer:res.picSummer,
            pictureWinter:res.picWinter
        })
      })
      //那个是红标
        
        if (localStorage.getItem('搜索')) {
            this.setState({
                result: localStorage.getItem('搜索')
            })
            
            localStorage.setItem('搜索', '')
        }
        //跳转红标
        if (localStorage.getItem('zlx_num')) {
            var pp=localStorage.getItem('zlx_num')
            console.log('pp'+pp)
            var length=pp.length;
            console.log('我的家'+pp.substring(3,length))
            this.setState({
                jump:pp.substring(3,length)
            })
            setTimeout(function(){
                localStorage.setItem('zlx_num', '')
            },1000)
            
        }
       
    }
    render() {
        return (
            <div>
                <NavBar
                // style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                    style={{backgroundColor:'rgb(252, 157, 154)'}}
                    leftContent={
                        <Link to={"/apptab/"+this.props.match.params.id+'&store'}><img src={Back} 
                        style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                    >
                        {this.state.item}
                    {/* {localStorage.getItem('jia')?localStorage.getItem('jia'):'家'} */}
                    </NavBar>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <Accordion defaultActiveKey={this.state.kai} className="my-accordion" onChange={this.onChange}>
                        <Accordion.Panel header="夏季">
                            <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureSummer.map((item, i) => {
                                        if (item == this.state.jump) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="春秋" className="pad">
                            <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureString.map((item, i) => {
                                        if (item == this.state.jump) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Accordion.Panel>
                        <Accordion.Panel header="冬季" className="pad">
                        <div style={{ position: 'relative' }}>
                                {
                                    this.state.pictureWinter.map((item, i) => {
                                        if (item == this.state.jump) {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '1px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else if (item == this.state.result) {

                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px', border: '2px solid red' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div key={i} style={{ display: 'inlinbe-block', position: 'relative', width: '32%', height: "120px", margin: '2px', float: 'left' }}>
                                                    <img src={`http://47.98.163.228:3004/${item}`} style={{ width: '100%', height: '120px' }} />
                                                    <span style={{ position: "absolute", color: 'red', right: '5px', top: '-3px' }} onClick={this.deleteItem.bind(this, item)}>x</span>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </Accordion.Panel>
                    </Accordion>
                </div>

            </div>
        )
    }
}




//原来显示图片
{/* <div style={{position:'relative'}}>
                    {
                    this.state.picture.map((item,i)=>{
                        if(i==this.state.num){
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px',border:'1px solid red'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                                )
                        }else if(item==this.state.result){
                            
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px',border:'2px solid red'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                                )
                        }else{
                            return(
                                <div key={i} style={{display:'inlinbe-block',position:'relative',width:'32%',height:"120px",margin:'2px',float:'left'}}>
                                <img src={`http://47.98.163.228:3004/${item}`}style={{width:'100%',height:'120px'}}/>
                                <span style={{position:"absolute",color:'red',right:'5px',top:'-3px'}} onClick={this.deleteItem.bind(this,i)}>x</span>
                                </div>
                            )
                        }
                    })
                    }
                </div> */}