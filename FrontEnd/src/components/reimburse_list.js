/**
 * oxchain ivoice app
 *
 * 企业发票审核列表
 *
 * Author: Jun
 * Email: iyakexi@gmail.com
 * Date: 20/04/2017
 *
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchReimburseList } from '../actions/reimburse';
import { Link } from 'react-router';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';

class ReimburseList extends Component {

  componentWillMount() {
    this.props.fetchReimburseList(this.props.params.page);
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
  //         <Link to={`/reimburse/${row.serial}`} >共享</Link>
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
                {/*{ this.renderRows() }*/}
                <td> &nbsp;1001</td>
                <td> 精神病啊</td>
                <td> 2017.9.22</td>
                <td> 北京协和医院</td>
                <td> 王大锤</td>
                <td> 多喝点热水</td>
                <td>
                  <a href="">查看</a>
                  <a href="">共享</a>
                </td>
                </tbody>
              </table>
            </div>
            <div className="box-footer clearfix hidden">
              <ReactPaginate previousLabel={"«"}
                             nextLabel={"»"}
                             breakLabel={<a href="">...</a>}
                             breakClassName={"break-me"}
                             pageCount={this.props.pageCount}
                             initialPage={this.props.params.page-1}
                             disableInitialCallback={true}
                             marginPagesDisplayed={2}
                             pageRangeDisplayed={5}
                             onPageChange={this.handlePageClick.bind(this)}
                             containerClassName={"pagination pagination-sm no-margin "}
                             subContainerClassName={"pages pagination"}
                             activeClassName={"active"} />
            </div>
          </div>
        </div>
      </div>)
  }
}

function mapStateToProps(state) {
  return {
    all: state.reimburse.all,
    pageCount: state.reimburse.pageCount
  };
}

export default connect(mapStateToProps, { fetchReimburseList })(ReimburseList);