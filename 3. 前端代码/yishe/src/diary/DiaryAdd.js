import React, { Component} from 'react';
import { NavBar ,ImagePicker  } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import { Input } from 'antd';
const { TextArea } = Input;

export default class DiaryAdd extends Component {
    constructor(){
        super();
        var today = new Date(),
            date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes();
        this.state = {
            value: '',
            files: [],
            diarytime:date,
            index:0,
            name:[],
            url:[]


        };
    }
    hrefChange(str){
        var h=window.location.href;
        var arr = h.split('/');
        window.location.href = arr[0] + str;
    }
    onPost=()=> {      
        // console.log(this.props.match.params.id);//获取到的用户id 
       
        fetch('http://47.98.163.228:8081/dd',{
            method: 'post', 
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({value:this.state.value,name:this.state.name,url:this.state.url,diarytime:this.state.diarytime}) 
        })
        console.log(this.state.files);

    }
    
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    onChange = (files) => {
        var index = this.state.index;
        this.setState({
            files,
        });
        var name = [...this.state.name,this.state.files[index].file.name]
        var url = [...this.state.url,this.state.files[index].url]
        this.setState({
            name:name,
            url:url
        })
        console.log(this.state.name);
        console.log(this.state.url);
        this.setState({
            index:index+1
        })
    }
    
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/rijitab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <Link to={"/rijitab/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.onPost}>完成</Link>
                ]}
                >发布穿搭日记</NavBar>

                <TextArea style={{marginTop:'5%',marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)'}}
                    value={this.state.value}
                    onChange={this.onChange1}
                    placeholder="这一刻，我想说..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                 <ImagePicker
                    files={this.state.files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </div>
        )
    }
}
