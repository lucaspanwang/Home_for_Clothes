import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';
import Back from '../images/fanhui_1.png';

export default class Robe extends Component {
    constructor(){
        super();
        this.state={
            url:'http://47.98.163.228:8087/robe',
            picture:[],  
            num:-1,
            result:''
        }
    }
    deleteItem=(i,that)=>{
        // console.log(i)
        var p=this.state.picture;
        // console.log('删除前；',p)
        p.splice(i,1);
        // console.log('删除后：',p)
        this.setState({
            picture:p
        })
        fetch('http://47.98.163.228:8084/delete',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:JSON.stringify({nage:i,weizhi:'柜子',userId:this.props.match.params.id})
        })
        
    }
    // componentWillMount(){
    //     fetch("http://47.98.163.228:8084/userid", {
    //     method: 'post', 
    //     "Access-Control-Allow-Origin" : "*",
    //     "Access-Control-Allow-Credentials" : true,
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body:JSON.stringify({userId:this.props.match.params.id,zhengli:'柜子'}) 
    //   });
    // }
    componentDidMount(){
        //那个是红标
        if (localStorage.getItem('搜索')) {
            this.setState({
                result: localStorage.getItem('搜索')
            })
            localStorage.setItem('搜索', '')
        }
      //显示图片
        fetch('http://47.98.163.228:3003/picture', {
        method: 'post',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId:this.props.match.params.id,
          whereId:"2"
        })
      }).then((res)=>res.json())
      .then((res)=>{
        //   console.log('图片路径接收：'+JSON.stringify(res))
        this.setState({
            picture:res
        })
      })
    //     console.log(this.props.match.params.id);//获取用户id
    //     fetch("http://47.98.163.228:8087/userid", {
    //     method: 'post', 
    //     "Access-Control-Allow-Origin" : "*",
    //     "Access-Control-Allow-Credentials" : true,
    //     credentials: 'include',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body:JSON.stringify({userId:this.props.match.params.id}) 
    //   });
    //     fetch(this.state.url)
    //     .then(res=>res.json())
    //     .then(res=>{
    //         this.setState({
    //             picture:res
    //         })
    //         console.log(res)
    //     });
        
      fetch('http://47.98.163.228:8083/pp2')
        .then(res=>res.json())
        .then(res=>{
            console.log('????'+res.msg)
            var n = localStorage.getItem('count')
            localStorage.setItem('count', n+1)
            var nn = localStorage.getItem('count')
            if(nn==1){
                this.setState({
                    num:res.msg-1
                })
            }else{
                this.setState({
                    num:-1
                })
            }
        });
    }
    render() {
        return (
            <div>
                <NavBar
                // style={{width:'100%',backgroundColor:'#fc9d9a',color:'white',position:'fixed',top:0,left:0,zIndex:99}}
                    leftContent={
                        <Link to={"/apptab/"+this.props.match.params.id+'&store'}><img src={Back} style={{ width: '30px', height: "30px" }} key="fan"/></Link>
                    }
                style={{backgroundColor:'rgb(252, 157, 154)'}}
                >
                    {localStorage.getItem('guizi')?localStorage.getItem('guizi'):'衣柜'}
                    </NavBar>
                <div>
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
                </div>
            </div>
        )
    }
}
