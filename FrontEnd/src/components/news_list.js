
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchNewsList } from '../actions/mdicalrecord';
import { Link } from 'react-router';
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // biz : JSON.parse(localStorage.getItem('biz')),
    };
  }

    componentWillMount() {
    this.props.fetchNewsList();
  }

  // renderRows() {
  //   return this.props.all.map((row, idx) => {
  //     return (<tr key={idx}>
  //       <td>{row.title}</td>
  //       <td>
  //         <Link to={`/invoice/detail/${row.serial}`} className="btn-agree" >同意</Link>
  //       </td>
  //         <td>
  //            <Link to={`/invoice/detail/${row.serial}`} className="btn-agree" >拒绝</Link>
  //         </td>
  //     </tr>);
  //   });
  // }
    renderRows(){
        // return this.props.all.map((row, idx) => {
            return (
                <tr>
                  <td>某某医院申请查看您的病历</td>
                  <td className="text-center">
                    <Link className="btn-agree" >同意</Link>
                  </td>
                  <td className="text-center">
                    <Link className="btn-agree" >拒绝</Link>
                  </td>
                </tr>
            )
        // })
    }

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="box box-info">
            <div className="box-header"><h3 className="box-title">消息列表</h3></div>
            <div className="box-body table-responsive no-padding">
              <table className="table table-bordered table-hover">
                <tbody>
                { this.renderRows() }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>)
  }
}

function mapStateToProps(state) {
    return {
        all:"hi"
        // all: state.mdicalrecord.all
    };
}
export default connect(mapStateToProps, { fetchNewsList })(NewsList);