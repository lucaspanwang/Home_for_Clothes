import React, { Component } from 'react'
import { Input,message, Button } from 'antd';
const { TextArea } = Input;

export default class Add extends Component {
  constructor(){
    super();
    this.state={
        id:'',
        value:''
    }
  }
  success = () => {
      message.success('文章提交中...',1,()=>{
          window.location.href="/tab/article"
      });
  };
  error = () => {
      message.error('提交不能为空！！！',2);
  };
  onPost=()=> { 
      if(this.state.value == ''){
          this.error();
      }else{
          console.log(this.state.value);
          console.log(this.state.id);
          var today = new Date();
          var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
          fetch('http://47.98.163.228:8086/articleAdd',{
              method: 'post', 
              "Access-Control-Allow-Origin" : "*",
              "Access-Control-Allow-Credentials" : true,
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: JSON.stringify({userId:this.state.id,content:this.state.value,time:date,cimg:[],cimgName:[]}) 
          });
          this.success();
      }
    }
    handleChange = (e) =>{
        this.setState({
            value: e.target.value
        })
    }
    handleChange1 = (e) =>{
      this.setState({
          id: e.target.value
      })
    }
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                  <form id="ayiya">
                      userId&nbsp;&nbsp;<input id="userId" onChange={this.handleChange1} style={{width:"20%",height:'50px',border:"1px solid #888",borderRadius:"5px"}}/>
                      <br />
                      内容：<br />
                      <TextArea id="content" onChange={this.handleChange} style={{width:"90%",height:'300px',border:"1px solid #888",borderRadius:"15px"}}/>
                      <br />
                      <input type='button' value="submit" style={{width:'70px',marginLeft:'50px'}} onClick={this.onPost}/>
                  </form>
                </div>
            </div>
        )
    }
}

  