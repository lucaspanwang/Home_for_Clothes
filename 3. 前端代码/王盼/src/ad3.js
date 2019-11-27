import React, {Component} from 'react';
import ad3 from './images/ad3.jpg';
import but from './images/button.png';

export default class Ad3 extends Component{
    render(){
        return(
            <div className="ad3">
                <img src={ad3} width="375px" height="809px"/>
                <img className="button_e" src={but} width="375px"/>
            </div>
        );
    }
}