import React, { Component } from 'react'

export default class Add extends Component {
    constructor(){
      super();
      this.state=({

      })
    }
    componentDidMount(){
      // fetch('http://47.98.163.228:8086/articleAdd',{
      //     method: 'post', 
      //     "Access-Control-Allow-Origin" : "*",
      //     "Access-Control-Allow-Credentials" : true,
      //     credentials: 'include',
      //     headers: {
      //         'Content-Type': 'application/x-www-form-urlencoded'
      //     },
      //     body: JSON.stringify({userId:this.props.match.params.id,content:this.state.value,time:date,cimg:this.state.cimg,cimgName:cimgName}) 
      //   });
      }
    render() {
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                  <form id="ayiya">
                      userId&nbsp;&nbsp;<input id="userId"/>
                      <br />
                      content<input id="content" style={{height:'300px'}}/>
                      <br />
                      <input type='button' value="submit" style={{width:'70px',marginLeft:'150px'}}/>
                  </form>
                </div>
            </div>
        )
    }
}

  