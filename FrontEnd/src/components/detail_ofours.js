/**
 * Created by oxchain on 2017/9/26.
 */


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchdetialofours } from '../actions/mdicalrecord';
class Detialofours extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.props.fetchdetialofours();
    }
    // renderRow(item,index){
    //     // console.log(item)
    //     return (
    //         <tr  key={index} className="list-style">
    //             <td className="ul-style ">姓名: {item.name}</td>
    //             <td className="ul-style">性别: {item.sex}</td>
    //             <td className="ul-style ">年龄: {item.year} 岁</td>
    //         </tr>
    //     )
    // }
    handleRow(item,index){
        return(
            <tr key={index} className="">
                <td className="td-left">{item.name}</td>
                <td className="td-wrap">{item.detial}</td>
            </tr>
        )
    }
    render() {
        // const itemRow =[
        //     {name:"张三三",sex:"女",year:"18"}
        // ]
        const linkRow =[
            {name:"智力",detial:"如果有一天你走进我的心"},
            {name:"视力",detial:"如果有一天你走进我的心"},
            {name:"心脏",detial:"如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心"},
            {name:"血压",detial:"如果有一天你走进我的心如果有一天你走进我的心"},
            {name:"口吃",detial:"如果有一天你走进我的心如果有一天你走进我的心"},
        ]

        // const { handleSubmit} = this.props;
        return (
            <div>
                <section className="content">
                    <div className="text-center "><h2>北京协和医院</h2></div>
                    {/*<hr className="hr-color"/>*/}
                    {/*{itemRow.map(this.renderRow)}*/}
                    {/*<div className="clear"></div>*/}
                    <form action="" className=" box  box-info">
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                <tr>
                                    <th>项目名称</th>
                                    <th>详细信息</th>
                                </tr>
                                {linkRow.map(this.handleRow)}
                                </tbody>
                            </table>
                        </div>
                    </form>

                </section>
            </div>

        )
    }
}

function mapStateToProps(state) {
    // console.log(state.mdicalrecord)
    return {

    };
}

export default connect(null, { fetchdetialofours })(Detialofours);
