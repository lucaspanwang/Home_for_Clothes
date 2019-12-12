import React, { Component} from 'react';
import { NavBar ,ImagePicker  } from 'antd-mobile';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import fanhui from '../images/返回 (1).png';
import { Input } from 'antd';
const { TextArea } = Input;

export default class ArticleAdd extends Component {
    constructor(){
        super();
        this.state = {
            value: '',
            cimg: [],
        };
    }
    onPost=()=> {      
        // console.log(this.props.match.params.id);//获取到的用户id 
        console.log(this.state.value);
        console.log(this.state.cimg);
        if(this.state.value == '' && this.state.cimg == ''){
            return ;
        }else{
            var today = new Date();
            var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()+' '+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds();
            var cimgName = [];
            for(var i=0;i<this.state.cimg.length;i++){
                console.log(this.state.cimg[i].file.name.split(".")[1]);
                cimgName[i]='.'+this.state.cimg[i].file.name.split(".")[1];
            }
            fetch('http://47.98.163.228:8086/articleAdd',{
                method: 'post', 
                "Access-Control-Allow-Origin" : "*",
                "Access-Control-Allow-Credentials" : true,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: JSON.stringify({userId:this.props.match.params.id,content:this.state.value,time:date,cimg:this.state.cimg,cimgName:cimgName}) 
            });
        }
    }
    
    onChange1 = ({ target: { value } }) => {
        this.setState({ value });
    };
    onChange = (cimg, type, index) => {
        this.setState({
            cimg,
        });
    }
    
    render() {
        return (
            <div>
                <NavBar 
                style={{backgroundColor:'#fc9d9a',color:'white'}}
                leftContent={[
                    <Link to={"/shequtab/"+this.props.match.params.id}><img src={fanhui} style={{width:'30px'}} key="fan"/></Link>
                ]}
                rightContent={[
                    <Link to={"/shequtab/"+this.props.match.params.id} style={{backgroundColor:'#fc9d9a',color:'white',fontSize:'18px'}} onClick={this.onPost}>发布</Link>
                ]}
                >社区发布文章</NavBar>

                <TextArea style={{marginTop:'5%',marginLeft:'3%',width:'94%',backgroundColor:'rgb(252,251,251)'}}
                    value={this.state.value}
                    onChange={this.onChange1}
                    placeholder="这一刻，我想说..."
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                 <ImagePicker
                    files={this.state.cimg}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                />
            </div>
        )
    }
}