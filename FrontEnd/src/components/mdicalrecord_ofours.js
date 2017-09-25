

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchMdicalrecordofours } from '../actions/mdicalrecord';
import { Link } from 'react-router';
import Moment from 'react-moment';


class  Mdicalrecord extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount() {
        this.props.fetchMdicalrecordofours();
    }

    // renderRows() {
    //   return this.props.all.map((row, idx) => {
    //     return (<tr key={idx}>
    //       <td>{idx+1}</td>
    //       <td>{row.serial}</td>
    //       <td><Moment locale="zh-cn" format="lll">{row.createtime}</Moment></td>
    //       <td>{row.status}</td>
    //       <td>{row.customer}</td>
    //       <td>{row.description}</td>
    //       <td>
    //         <Link to={`/reimburse/${row.serial}`} >查看</Link>
    //         <Link to={`/reimburse/${row.serial}`} >{this.biz?"共享":""}</Link>
    //       </td>
    //
    //     </tr>);
    //   });
    // }

    handlePageClick(data) {
        let selected = data.selected;
        this.props.fetchReimburseList(selected + 1);
    };

    render() {
        const biz= JSON.parse(localStorage.getItem('biz'));
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-info">
                        <div className="box-header"><h3 className="box-title">病例列表</h3></div>
                        <div className="box-body table-responsive no-padding">
                            <table className="table table-bordered table-hover">
                                <tbody>
                                <tr>
                                    <th>病例号</th>
                                    <th>诊疗项目</th>
                                    <th>诊断时间</th>
                                    <th>医院</th>
                                    <th>医生</th>
                                    <th>描述</th>
                                    <th>操作</th>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

function mapStateToProps(state) {
    // console.log(state.mdicalrecord)
    return {
        all:"hi"
        // all: state.mdicalrecord.all
    };
}

export default connect(mapStateToProps, { fetchMdicalrecordofours })(Mdicalrecord);