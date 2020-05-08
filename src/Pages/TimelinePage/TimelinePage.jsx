/**
 * 基于ZRender
 * 安装 npm install zrender
 */
import React from 'react';
import { line } from './line';
import './TimelinePage.less';
import TimeLine from '../../Components/Timeline/Timeline'

export default class TimeLinePage extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return <TimeLine
            data={line.points}
            trackColor={'#FB7A31'}
            dataColor={'#27A42F'}
            bollColor={'#FB7A31'}
            startTime={200}
        ></TimeLine >
    }
}