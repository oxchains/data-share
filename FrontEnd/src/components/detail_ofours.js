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
        this.props.fetchdetialofours(this.props.params.id);
    }
    render() {
        const alldata  = this.props.all;
        if(!alldata)
        {
            return (
                <div>loading...</div>
            )
        }else{
        return (
            <div>
                <section className="content">
                    <div className="text-center "><h2>{alldata.ownhospital}</h2></div>
                    {/*<hr className="hr-color"/>*/}
                    {/*{itemRow.map(this.renderRow)}*/}
                    {/*<div className="clear"></div>*/}
                    <form action="" className=" box  box-info">
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                <tr>
                                    <th>科室</th>
                                    <th>详细信息</th>
                                    <th>姓名</th>
                                    <th>年龄</th>
                                    <th>性别</th>
                                </tr>
                                <tr>
                                    <td>{alldata.department}</td>
                                    <td>{alldata.details}</td>
                                    <td>{alldata.patientname}</td>
                                    <td>{alldata.patientsex}</td>
                                    <td>{alldata.patientage}</td>
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
    // console.log(state.mdicalrecordreducer.data)
    return {
        all:state.mdicalrecordreducer.data
    };
}

export default connect(mapStateToProps, { fetchdetialofours })(Detialofours);
