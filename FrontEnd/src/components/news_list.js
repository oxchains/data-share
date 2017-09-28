
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchNewsList ,fetchNewsAgree,fetchNewsRefuse} from '../actions/mdicalrecord';
import { Link } from 'react-router';
class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleagree = this.handleagree.bind(this)
      this.handlerefuse = this.handlerefuse.bind(this)
  }
    componentWillMount() {
      console.log(this.props.all)

        this.props.fetchNewsList({ },()=>{});
  }
  handleagree(){
      const deadline = "2017-11-08",
          ownerid   = "1234567",
          permissiontype = "permission_share",
          recordid     =   "004",
          userid       ="bdgjyy1";
      this.props.fetchNewsAgree({deadline,ownerid,permissiontype,recordid,userid},()=>{});
  }
    handlerefuse(){
        const recordid = "004",
            userid   = "1234567"
        this.props.fetchNewsRefuse({recordid,userid},()=>{});

    }
  // renderRows() {
  //   return this.props.all.map((row, idx) => {
  //     return (<tr key={idx}>
  //       <td>{row.title}</td>
  //       <td>
  //         <button onClick={this.handleagree} className="btn-agree" >同意</button>
  //       </td>
  //         <td>
  //             <button className="btn-agree" onClick={this.handleagree} >拒绝</button>
  //         </td>
  //     </tr>);
  //   });
  // }
    renderRows(){
        // return this.props.all.map((row, idx) => {
            return (
                <tr>
                  <td>某某医院申请查看您的某某病历</td>
                  <td className="text-center">
                    <button onClick={this.handleagree} className="btn-agree" >同意</button>
                  </td>
                  <td className="text-center">
                    <button className="btn-agree" onClick={this.handlerefuse} >拒绝</button>
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
        all: state.mdicalrecordreducer.all
    };
}
export default connect(mapStateToProps, { fetchNewsList ,fetchNewsAgree,fetchNewsRefuse})(NewsList);