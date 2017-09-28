/**
 * Created by oxchain on 2017/9/25.
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchMdicalrecordshare,fetchMdicalrecorddetial } from '../actions/mdicalrecord';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        };
    }
    handleFormSubmit(e){
        e.preventDefault()
        const Inputvalue = this.refs.IDInput.value ;
        // const Checkbox =  this.refs.CheckboxInput.value ;
        this.props.fetchMdicalrecordshare({Inputvalue},()=>{});
        console.log(Inputvalue)
    }
    // renderrow(item,index){
    //     return(
    //         <tr key={index}>
    //             <td><input type="checkbox" ref="CheckboxInput" value={index + 1}/></td>
    //             <td>{item.title}</td>
    //             <td>{item.time}</td>
    //             <td>
    //                 <Link to={`/detial:${item.num}`}>{item.do1} &nbsp;&nbsp;&nbsp;</Link>
    //             </td>
    //         </tr>
    //     )
    // }

    renderField({ input, label, type, meta: { touched, error } }) {
        return (
            <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
                <input {...input} placeholder={label} type={type} className="input-search form-control"/>
                <input type="submit" className="click-search" value="共享"/>
                <div className="help-block  with-errors">{touched && error ? error : ''}</div>
            </div>
        )}

    componentWillMount() {
        this.props.fetchMdicalrecorddetial();
    }
    // renderRow(item,index){
    //     // console.log(item)
    //     return (
    //         <tr key={index} className="list-style">
    //             <td className="ul-style col-lg-2">姓名: {item.name}</td>
    //             <td className="ul-style col-lg-2">性别: {item.sex}</td>
    //             <td className="ul-style col-lg-2">年龄: {item.year} 岁</td>
    //         </tr>
    //     )
    // }
    handleRow(item,index){
        return(
            <tr key={index} className="">
                <td className="td-left">{item.name}</td>
                <td className="td-wrap">{item.detial}</td>
                <td className="td-right"><input type="checkbox" defaultChecked/></td>
            </tr>
        )
    }

    render() {
        // const renderrow =[
        //     {num:"1001",title:"精神病啊",time:"2017.9.22",hospital:"北京协和医院",do1:"查看"},
        //     {num:"1002",title:"良性肿瘤",time:"2015.3.23",hospital:"北京同仁堂医院",do1:"查看"},
        //     {num:"1003",title:"哮喘病",time:"2016.1.22",hospital:"北京海淀医院",do1:"查看"},
        // ]
        const username= localStorage.getItem('username');

        // const itemRow =[
        //     {name:"张三三",sex:"女",year:"18"}
        // ]
        const linkRow =[
            {name:"视力",detial:"如果有一天你走进我的心如果"},
            {name:"视力",detial:"如果有一天你走进我的心如果"},
            {name:"视力",detial:"如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有一天你走进我的心如果有"},
            {name:"视力",detial:"如果有一天你走进我的心如果"},
            {name:"视力",detial:"如果有一天你走进我的心如果"},
        ]
        return (<div className="row">
            <div className="col-lg-10 col-lg-offset-2 col-xs-10 col-xs-offset-1">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <form action="" className="text-center form-margintop" onSubmit={this.handleFormSubmit.bind(this)}>
                            <Field name="name" component={this.renderField}  type="text" lable="请输入医院ID" ref="IDInput"/>
                        </form>
                            <h4>{username} 的病历</h4>
                            <table className="table table-bordered table-hover">
                                <tbody>
                                {/*{renderrow.map(this.renderrow)}*/}
                                {/*<h2>北京协和医院</h2>*/}
                                {/*{itemRow.map(this.renderRow)}*/}
                                {/*<div className="clear"></div>*/}
                                <tr>
                                    <th className="td-left">项目名称</th>
                                    <th className="td-wrap">详细信息</th>
                                    <th className="td-right">操作</th>
                                </tr>
                                {linkRow.map(this.handleRow)}
                                </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </div>);
    }
};

const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = '医院名不能为空';
    }
    return errors
};

function mapStateToProps(state) {
    return {
        // all: state.news.all,
    };
}

const reduxSignupForm = reduxForm({
    form: 'SignForm',
    validate
})(Search);
export default connect(mapStateToProps,{ fetchMdicalrecordshare,fetchMdicalrecorddetial })(reduxSignupForm);