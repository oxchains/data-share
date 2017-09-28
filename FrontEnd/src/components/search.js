
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchMdicalrecordsearch ,fetchRequestlook} from '../actions/mdicalrecord';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value:false
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handlechange = this.handlechange.bind(this)
  }

    handleFormSubmit(e){
      e.preventDefault()
        const Inputvalue= this.refs.IDInput.value ;
       localStorage.setItem("Inputvalue",Inputvalue)
        this.props.fetchMdicalrecordsearch({Inputvalue},()=>{});
    }
    handlechange(){
      console.log("点击了申请查看")
        const userid = localStorage.getItem("username")
        // const ownerid= localStorage.getItem("Inputvalue")
        const  ownerid = "123456";
        const  recordid = "111";
        this.props.fetchRequestlook({ownerid,recordid,userid},()=>{});
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
                <tr>
                  <td> &nbsp;1001</td>
                  <td> 精神病啊</td>
                  <td> 2017.9.22</td>
                  <td >
                    <Link className="font-color" onClick={this.handlechange}>{this.value?"查看":"申请查看"}</Link>
                    {/*<a href="" >{this.biz?"共享":""}</a>*/}
                  </td>
                </tr>
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
    return {
        all: state.mdicalrecordreducer.all
    };
}
export default connect(mapStateToProps,{fetchMdicalrecordsearch,fetchRequestlook})(Search);