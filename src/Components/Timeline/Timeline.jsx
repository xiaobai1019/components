/**
 * 基于ZRender
 * 安装 npm install zrender
 * 
 *  data={[]}  要显示的数据
 *  trackColor={''}  小球轨道的颜色
 *  dataColor={''}  数据的颜色
 *  bollColor={''}  小球的颜色
 *  startTime={200}  小球起始时间   100-1000
*/
import React, { Fragment } from 'react';
import zrender from 'zrender';
import goAhead from './img/goAhead.png';
import back from './img/back.png';
import start from './img/start.png';
import './Timeline.less';
import { getYMD, getTimeArr, getYMDhm, timeToTimestamp, gethm } from '../../Common/utils'

export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStarted: false,//小球是否开始运动，展示开始或暂停按钮
            isSetTimeOut: null,//记录小球运动的定时器，需要清除
            startTime: props.startTime,//小球运动的起始时间
            walkStep: 0,//小球运动的位置
            circle: null,//运动的小球
            YMDARR: [],//一天24小时的时间戳
            rectHoverPo: 0,//鼠标悬浮显示当前悬浮点的时间
            newData: {},//传进来的数据 以时间戳为key
        }
    }

    timeline = React.createRef();
    componentDidMount() {
        let { data } = this.props;
        let { newData } = this.state;
        //获取数据中传入的日期
        let YMD = getYMD(data[0].loc_time)
        //获取传入日期的一天24小时数组
        let YMDARR = getTimeArr(YMD)

        // 将父组件传入的数据以时间戳为key的对象（时间戳获取到时分）
        data.map(item => {
            let { loc_time } = item;
            //获取时间戳的年月日时分
            let YMDhm = getYMDhm(loc_time);
            // 将年月日再次转成时间戳
            let timestamp = timeToTimestamp(YMDhm);
            newData[timestamp] = item
        })
        this.setState({ YMDARR, newData }, () => this.createRect());
    }

    createRect = () => {
        let { YMDARR, newData } = this.state;
        let { trackColor, dataColor, bollColor } = this.props;
        let zr = zrender.init(this.timeline.current);
        let group = new zrender.Group();
        group.position[0] = 8;
        group.position[1] = 22;
        let len = YMDARR.length;
        //时间轴显示24小时
        for (let i = 0; i < len; i++) {
            let hasTime = newData.hasOwnProperty(YMDARR[i]);
            let rect = new zrender.Rect({
                shape: {
                    x: i,
                    y: 0,
                    width: 10,
                    height: 8
                },

                style: {
                    fill: hasTime ? dataColor : trackColor,
                    text: i % 60 === 0 ? i / 60 : '',
                    fontSize: 12,
                    textOffset: [0, 15],
                    textFill: 'rgba(0,0,0,.6)',
                }
            });

            rect.attr({
                i: i,
                t: YMDARR[i],
                po: hasTime ? [newData[YMDARR[i]].longitude, newData[YMDARR[i]].latitude] : []
            })

            rect.on('click', function () {
                //当前this代表的是点击的rect
                console.log(this.t)
            })
            let rectHover = new zrender.Rect({
                shape: {
                    x: 0,
                    y: -22,
                    width: 50,
                    height: 20,
                    r: 4
                },
                invisible: true,
                style: {
                    fill: 'rgba(0,0,0,.5)',
                    text: '1',
                    textFill: '#fff',
                    transformText: true
                }
            });
            rectHover.scale = [800 / YMDARR.length, 1];
            group.add(rectHover);

            rect.on('mouseover', function () {
                //当前this代表的是点击的rect
                if (this.i > YMDARR.length - 50) {
                    this.i = this.i - 50
                }
                rectHover.attr({
                    invisible: false,
                    position: [this.i * 800 / YMDARR.length, 0],
                    style: {
                        text: gethm(this.t),
                    }
                })
            })
            rect.on('mouseout', function () {
                rectHover.attr({
                    invisible: true,
                })
            })

            //将时间点缩放在父元素宽度内 父元素宽度721
            rect.scale = [800 / YMDARR.length, 1]
            group.add(rect);
        }
        //将时间点缩放在父元素宽度内 父元素宽度721
        // group.scale = [800 / YMDARR.length, 1]



        // 行走的小球
        let circle = new zrender.Circle({
            shape: {
                cx: 0,
                cy: 7,
                r: 14
            },
            style: {
                fill: bollColor,
            }
        })

        circle.scale = [800 / YMDARR.length, 800 / YMDARR.length];
        this.setState({ circle })
        group.add(circle);

        zr.add(group);

    }

    // 小球走
    walk = () => {
        let { circle, isSetTimeOut, walkStep, startTime, YMDARR } = this.state;
        if (walkStep < YMDARR.length) {
            circle.attr({
                position: [walkStep, 0]

            })
            walkStep++;
            //清除定时器
            isSetTimeOut && clearTimeout(isSetTimeOut)
            isSetTimeOut = setTimeout(() => {
                this.walk()
            }, startTime);
            this.setState({ isSetTimeOut, walkStep })
        }
    }

    // 控制小球走动
    run = (type) => {
        let { isSetTimeOut, startTime } = this.state;
        switch (type) {
            case 1://开始走动
                this.walk();
                this.setState({ isStarted: true })
                break;
            case 2://暂停
                clearTimeout(isSetTimeOut);
                this.setState({ isStarted: false })
                break;
            case 3://加速
                if (startTime > 100) {
                    startTime -= 100;
                    console.log('加速', startTime)
                    this.setState({ startTime }, () => this.walk());
                } else {
                    console.log('时间已经很快啦')
                }
                break
            case 4://减速
                if (startTime < 1000) {
                    startTime += 100;
                    console.log('减速', startTime)
                    this.setState({ startTime }, () => this.walk());
                } else {
                    console.log('时间已经很慢啦')
                }
                break
            default:

                break;
        }
    }

    render() {
        let { isStarted } = this.state;
        return <Fragment>
            <div className={'timeLine'}>
                <div className={'options'}>
                    {
                        isStarted ? <div onClick={() => this.run(2)}>暂停</div> : <div onClick={() => this.run(1)}><img src={start} alt="开始" srcSet="" /></div>
                    }
                    <div onClick={() => this.run(4)}><img src={back} alt="减速" srcSet="" /></div>
                    <div onClick={() => this.run(3)}><img src={goAhead} alt="加速" srcSet="" /></div>
                </div>

                <div ref={this.timeline} style={{ width: '800px', height: '50px' }}></div>
            </div>
        </Fragment>
    }
}