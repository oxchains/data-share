import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMdicalrecordList } from '../actions/mdicalrecord';
import { Link } from 'react-router';
import Moment from 'react-moment';

class  Mdicalrecord extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderRows = this.renderRows.bind(this)
    }
  componentWillMount() {
      const userID = "1234567"
    this.props.fetchMdicalrecordList(userID,()=>{});
  }

  // 查看病历详情时是根据病历的序号做为区别
  renderRows() {
      const arraydata = this.props.all.RecordList || []
    return arraydata.map((item, index) => {
      return (
           <tr  key={index} className="test-center">
            <td> &nbsp;{item.Id}</td>
            <td> {item.PermissionType}</td>
            <td><Moment locale="zh-cn" format="lll">{item.Deadline}</Moment></td>
            <td></td>
           <td>
              <Link to={`/detialofours/${item.Id}`}>查看 &nbsp;&nbsp;&nbsp;</Link>
              <Link to={`/share:${item.Id}`}>分享</Link>
          </td>
      </tr>);
    });
  }

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
                  {/*<th>医生</th>*/}
                  {/*<th>描述</th>*/}
                  <th>操作</th>
                </tr>
                { this.renderRows()}
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

export default connect(mapStateToProps, { fetchMdicalrecordList })(Mdicalrecord);