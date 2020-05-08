import React, { Fragment } from 'react';
import Marker from '../../Components/Marker/Marker';
import { points1, points2, points3 } from './points';

let all = [].concat(points1, points2);
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            marker: all,
        }
    }

    changeData = (type) => {
        switch (type) {
            case 1:
                this.setState(() => ({ marker: points1 }));
                break;
            case 2:
                this.setState({ marker: points2 });
                break;
            case 3:
                this.setState({ marker: points3 });
                break;
            default:
                this.setState({ marker: all })
        }

    }

    render() {
        let { marker } = this.state;
        return (
            <Fragment>
                <div className={'btns'}>
                    <button onClick={() => this.changeData()}>all</button>
                    <button onClick={() => this.changeData(1)}>坐标1</button>
                    <button onClick={() => this.changeData(2)}>坐标2</button>
                    <button onClick={() => this.changeData(3)}>坐标3</button>
                </div>

                <Marker
                    center={[119.691246, 29.791328]}
                    zoom={15}
                    marker={{
                        point: marker,
                        options: {
                            icon: require('./img/marker.png'),
                            size: [32, 32]
                        }
                    }}
                ></Marker>
            </Fragment>
        )
    }
}