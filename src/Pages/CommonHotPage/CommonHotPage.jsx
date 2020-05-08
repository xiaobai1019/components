import React, { Fragment } from 'react';
import CommonHot from '../../Components/CommonHot/CommonHot';
import { po1, po2 } from './hot.js';
let all = [].concat(po1, po2)
export default class HotMap extends React.Component {
    constructor() {
        super();
        this.state = {
            hotData: all,
            color: {
                0: 'rgba(236,161,15,.3)',
                0.3: 'rgba(236,161,15,.5)',
                0.7: 'rgba(236,161,15,.7)',
                1: 'rgba(236,161,15,1)'
            }
        }
    }

    changeData = (type) => {
        switch (type) {
            case 0:
                this.setState(() => ({ hotData: all }));
                break;
            case 1:
                this.setState(() => ({ hotData: po1, color: null }));
                break;
            case 2:
                this.setState({ hotData: po2 });
                break;
            default:
                this.setState(() => ({ hotData: all }));
        }
    }

    render() {
        let { hotData, color } = this.state;
        console.log('color', color)
        return (
            <Fragment>
                <div className={'btns'}>
                    <button onClick={() => this.changeData(0)}>所有</button>
                    <button onClick={() => this.changeData(1)}>坐标1</button>
                    <button onClick={() => this.changeData(2)}>坐标2</button>
                </div>
                <CommonHot
                    center={[119.691246, 29.791328]}
                    zoom={15}
                    hotData={hotData}
                    color={color}
                    radius={30}
                    visible={true}
                    opacity={50}
                ></CommonHot >
            </Fragment >
        )
    }
}