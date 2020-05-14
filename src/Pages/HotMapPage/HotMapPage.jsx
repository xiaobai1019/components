// <script src="//api.map.baidu.com/api?v=3.0&type=webgl&ak=iuCDaDwUqbV1WlDKDY5gNiS0Dty50mVY"></script>
// <script src="https://unpkg.com/mapvgl/dist/mapvgl.min.js"></script> 
import React, { Fragment } from 'react';
import Hot from '../../Components/Hot/Hot';
import { points1, points2 } from './hot.js';
let all = {
    1: points1,
    2: points2
}
export default class HotMap extends React.Component {
    constructor() {
        super();
        this.state = {
            hotData: all,
        }
    }

    changeData = (type) => {
        switch (type) {
            case 0:
                this.setState(() => ({ hotData: all }));
                break;
            case 1:
                this.setState(() => ({ hotData: points1 }));
                break;
            case 2:
                this.setState({ hotData: points2 });
                break;
            default:
                this.setState(() => ({ hotData: all }));
        }
    }

    render() {
        let { hotData } = this.state;
        return (
            <Fragment>
                <div className={'btns'}>
                    <button onClick={() => this.changeData(0)}>所有</button>
                    <button onClick={() => this.changeData(1)}>坐标1</button>
                    <button onClick={() => this.changeData(2)}>坐标2</button>
                </div>
                <Hot
                    center={[119.691246, 29.791328]}
                    zoom={15}
                    hotData={hotData}
                    colors={{
                        1: {
                            0: 'rgba(255,53,13,.3)',
                            0.3: 'rgba(255,53,13,.5)',
                            0.7: 'rgba(255,53,13,.7)',
                            1: 'rgba(255,53,13,1)'
                        },
                        2: {
                            0: 'rgba(236,161,15,.3)',
                            0.3: 'rgba(236,161,15,.5)',
                            0.7: 'rgba(236,161,15,.7)',
                            1: 'rgba(236,161,15,1)'
                        }
                    }}
                ></Hot >
            </Fragment>
        )
    }
}