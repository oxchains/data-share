
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchMdicalrecordsearch } from '../actions/mdicalrecord';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  // renderField({ input, label, type, required, meta: { touched, error } }) {
  //   return (
  //     <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
  //       <label htmlFor="name" className="col-sm-3 control-label"><b className="text-danger">{required?'*':''}</b> {label}</label>
  //       <div className="col-sm-9 input-group">
  //         <input {...input} placeholder={label} type={type} className="form-control"/>
  //         <div className="help-block with-errors">{touched && error ? error : ''}</div>
  //       </div>
  //     </div>
  //   )}
    handleFormSubmit(e){
      e.preventDefault()
        const Inputvalue= this.refs.IDInput.value ;
        this.props.fetchMdicalrecordsearch({InputChoice},()=>{});
    }

  render() {

    return (<div className="row">
      <div className="col-lg-10 col-lg-offset-2 col-xs-10 col-xs-offset-1">
        <div className="box box-info">
          <div className="box-header with-border">
            <form action="" className="text-center form-margintop" onSubmit={this.handleFormSubmit.bind(this)}>
              <input className="input-search" type="text" placeholder="请输入病人ID" ref="IDInput"/>
              <input type="submit" className="click-search" value="搜索"/>
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
                    <Link href="/" className="font-color">申请查看</Link>
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
        // all: state.news.all
    };
}
export default connect(mapStateToProps,{fetchMdicalrecordsearch})(Search);