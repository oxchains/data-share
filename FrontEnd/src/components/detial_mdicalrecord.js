/**
 * Created by oxchain on 2017/9/26.
 */
// 个人病历详情

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMdicalrecorddetial } from '../actions/mdicalrecord';
class Detial extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.props.fetchMdicalrecorddetial(this.props.params.id);
    }
    render() {
        const alldata  = this.props.all;
        // console.log(alldata)
        if(!alldata)
        {
            return (
                <div><h1>loading...</h1></div>
            )
        }else{
            return (
                <div>
                    <section className="content">
                        <div className="text-center "><h3>医院名字:{alldata.ownhospital}</h3></div>
                        {/*<hr className="hr-color"/>*/}
                        {/*<div>*/}
                        {/*<h5>姓名 : {alldata.patientname} 年龄 : {alldata.patientage} 性别 : {alldata.patientsex}</h5>*/}
                        {/*</div>*/}
                        <div className="clear"></div>
                        <form action="" className=" box  box-info">
                            <div className="box-body table-responsive no-padding">
                                <table className="table table-bordered table-hover">
                                    <tbody>
                                    {/*<tr>*/}
                                    {/*<th>科室</th>*/}
                                    {/*<th>详细信息</th>*/}
                                    {/*<th>姓名</th>*/}
                                    {/*<th>年龄</th>*/}
                                    {/*<th>性别</th>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*<td>{alldata.department}</td>*/}
                                    {/*<td>{alldata.details}</td>*/}
                                    {/*<td>{alldata.patientname}</td>*/}
                                    {/*<td>{alldata.patientsex}</td>*/}
                                    {/*<td>{alldata.patientage}</td>*/}
                                    {/*</tr>*/}
                                    <tr>
                                        <th>项目名称</th>
                                        <th>具体内容</th>
                                    </tr>
                                    <tr>
                                        <td>科室</td>
                                        <td>{alldata.department}</td>
                                    </tr>
                                    <tr>
                                        <td>姓名</td>
                                        <td>{alldata.patientname}</td>
                                    </tr>
                                    <tr>
                                        <td>年龄</td>
                                        <td>{alldata.patientage}</td>
                                    </tr>
                                    <tr>
                                        <td>性别</td>
                                        <td>{alldata.patientsex}</td>
                                    </tr>
                                    <tr>
                                        <td>详细信息</td>
                                        <td>{alldata.details}</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </section>
                </div>
            )}
    }
}

function mapStateToProps(state) {
    return {
        all:state.mdicalrecordreducer.data
    };
}

export default connect(mapStateToProps, { fetchMdicalrecorddetial })(Detial);
