import React, {Component} from "react";
import { Carousel, WingBlank } from 'antd-mobile';
import ad from '../images/ad1.jpg';
import ad2 from '../images/ad2.jpg';
import ad3 from '../images/ad3.jpg';
import {Link} from 'react-router-dom';

const myHolder = ({ className = '', ...restProps }) => (
    <div className={`${className} placeholder`} {...restProps}>Block</div>
  );
export default class Advertise extends Component {
    state = {
        data: ['1', '2', '3'],
    }
    componentDidMount() {
        setTimeout(() => {
          this.setState({
            data: [ad,ad2,ad3],
          });
        }, 100);
      }
    
    render() {
        return (
            <div style={{width:'100%'}}>
                <WingBlank style={{width:'100%',marginLeft:"0px"}}>
                    <Carousel
                    autoplay={false}
                    infinite
                    >
                    {this.state.data.map((val,idx) => (
                        <img key={idx}
                            src={`${val}`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', touchAction:'none'}}
                            onClick={(e)=>{
                                if(idx==2){
                                    window.location.href+='login';
                                }
                            }}
                            onLoad={() => {
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    ))}
                    </Carousel>
                </WingBlank>
            </div> 
        );
    }
}
