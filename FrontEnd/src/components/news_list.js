
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNewsList ,fetchNewsAgree,fetchNewsRefuse} from '../actions/mdicalrecord';
import { Link } from 'react-router';
class NewsList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          // status:false
          status : 1
      };
      this.handleagree = this.handleagree.bind(this)
      this.handlerefuse = this.handlerefuse.bind(this)
      this.renderRows = this.renderRows.bind(this)

  }
    componentWillMount() {
        this.props.fetchNewsList({},()=>{});
  }
  handleagree(){
      this.setState({
          // status:true
          status:2
      })
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
    renderRows(){
        const alldata = this.props.all || []
        return alldata.map((row, idx) => {
            return (
                <tr  className={` ${row.status == this.state.status?"":"hidden"}`} key={idx}>
                  <td className="news_title">{row.providerid}</td>
                  <td className="text-center">
                      <button onClick={this.handleagree} className={`btn-agree`} >同意</button>
                    {/*<button onClick={this.handleagree} className={`btn-agree`} >{this.state.status == false?"同意":"已通过申请"}</button>*/}
                  </td>
                    {/*${this.state.status == true?"hidden":"show"}*/}
                  <td className={`text-center`} >
                    <button className={`btn-agree `}  onClick={this.handlerefuse} >拒绝</button>
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