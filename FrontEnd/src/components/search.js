
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchMdicalrecordsearch ,fetchRequestlook} from '../actions/mdicalrecord';
import Moment from 'react-moment';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
      this.renderRows = this.renderRows.bind(this)
  }

    handleFormSubmit(e){
      e.preventDefault()
        const Inputvalue= this.refs.IDInput.value ;
       localStorage.setItem("Inputvalue",Inputvalue)
        this.props.fetchMdicalrecordsearch(Inputvalue,()=>{});
    }
    // handleChange(){
    //     const ownerid= localStorage.getItem("Inputvalue")
    //     const alldata = this.props.all || [];
    //     alldata.map((item,index) =>{
    //         const  recordid = item.recordid
    //         localStorage.setItem("recordid",recordid)
    //     })
    //
    //     const recordid= localStorage.getItem("recordid")
    //     this.props.fetchRequestlook({ownerid,recordid},()=>{});
    // }
    handleChange = (item) => {
        const ownerid= localStorage.getItem("Inputvalue")
        const {recordid}  = item
        this.props.fetchRequestlook({ownerid,recordid},()=>{});
    }

    renderRows() {
        const alldata = this.props.all || [];
        return alldata.map((item, index) => {
            return (
                <tr  key={index} className="test-center">
                  <td> &nbsp;{item.id}</td>
                  <td> {item.healailment}</td>
                  <td><Moment locale="zh-cn" format="lll">{item.healtime}</Moment></td>
                  <td>
                      <Link className={`font-color  ${item.permissionstatus == 1? " " : "hidden"} `}>等待验证</Link>
                    <Link className={`font-color  ${item.permissionstatus == 2? " " : "hidden"} `} to={`/detialofours/${item.id}`}>查看</Link>
                    <Link className={`font-color  ${item.permissionstatus == 0? " " : "hidden"} `} onClick={this.handlechange}>申请查看</Link>
                  </td>
                </tr>);
        });
    }

  render() {
    return (<div className="row">
      <div className="col-lg-10 col-lg-offset-2 col-xs-10 col-xs-offset-1">
        <div className="box box-info">
          <div className="box-header with-border">
            <form action="" className="text-center form-margintop" onSubmit={this.handleFormSubmit}>
              <input className="input-search" type="text" placeholder="请输入病人ID" ref="IDInput"/>
              <input type="submit" className="click-search"   value="搜索"/>
            </form>
            <div className="result-search">
              <table className="table table-bordered table-hover">
                <tbody>
                <tr>
                  <th>病历序号</th>
                  <th>病历名字</th>
                  <th>诊断时间</th>

                  <th>操作</th>
                </tr>
                { this.renderRows()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
};
function mapStateToProps(state) {
    console.log(state.mdicalrecordreducer.all)
    return {
        all: state.mdicalrecordreducer.all
    };
}
export default connect(mapStateToProps,{fetchMdicalrecordsearch,fetchRequestlook})(Search);