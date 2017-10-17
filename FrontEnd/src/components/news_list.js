
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewsList ,fetchNewsAgree,fetchNewsRefuse} from '../actions/mdicalrecord';
import { Link } from 'react-router';
class NewsList extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
      this.renderRows = this.renderRows.bind(this)
  }
    componentWillMount() {
        const ownerid= localStorage.getItem('username');
        this.props.fetchNewsList(ownerid,()=>{});
  }
    handleAgree = (item) =>{
      console.log("2121")
      console.log(item)
        const {recordid, ownerid, userid, permissiontype, deadline} = item
        this.props.fetchNewsAgree({recordid, ownerid, userid, permissiontype, deadline},()=>{});
    }
    handleRefuse = (item) =>{
        const {recordid, ownerid} = item
        this.props.fetchNewsRefuse({recordid, ownerid},()=>{});
    }
    renderRows(){
        const alldata = this.props.all || []
        console.log(alldata)
        return alldata.map((item, idx) => {
            return (
                <tr  className={`${item.tempStatus == 1?"":"hidden"}`}  key={idx}>
                  <td className="news_title">{item.requestproviderid} 请求查看 {item.recordid}</td>
                  <td className="text-center">
                      <button onClick={() => this.handleAgree(item)} className={`btn-agree`} >同意</button>
                  </td>
                  <td className={`text-center`} >
                    <button className={`btn-agree`}  onClick={() => this.handleRefuse(item)} >拒绝</button>
                  </td>
                </tr>
            )
        })
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