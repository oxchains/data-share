/**
 * Created by oxchain on 2017/9/25.
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchMdicalrecordshare,fetchMdicalrecorddetial } from '../actions/mdicalrecord';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            spin : false,
            error: null,
            actionResult: ''
        };
    }
    componentWillMount() {
        this.props.fetchMdicalrecorddetial(this.props.params.id);
    }
    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };
    handleFormSubmit(e){
        e.preventDefault()
        const data = this.props.all;
        const userid = data.hospital.ownerid
        const ownerid = data.hospital.ownerid
        const recordid = data.hospital.recordid
        const deadline = data.hospital.deadline
        const permissiontype = data.hospital.permissiontype
        const healtime = data.hospital.healtime
        const healailment = data.hospital.healailment
        const providerid = this.refs.IDInput.value ;

        this.props.fetchMdicalrecordshare({ownerid,recordid,userid,providerid,deadline,permissiontype,healtime,healailment},()=>{});
    }

    renderField({ input, label, type, meta: { touched, error } }) {
        return (
            <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
                <input {...input} placeholder={label} type={type} className="input-search form-control"/>
                <input type="submit" className="click-search" value="共享"/>
                <div className="help-block  with-errors">{touched && error ? error : ''}</div>
            </div>
        )}


    render() {
        const alldata  = this.props.all;
        const username= localStorage.getItem('username');
        if(!alldata)
        {
            return (
                <div><h1>loading...</h1></div>
            )
        }else{
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
                                <tr>
                                    <th>项目名称</th>
                                    <th>具体内容</th>
                                    <th>操作</th>
                                </tr>
                                <tr>
                                    <td>科室</td>
                                    <td>{alldata.department}</td>
                                    <td><input type="checkbox" defaultChecked/></td>
                                </tr>
                                <tr>
                                    <td>姓名</td>
                                    <td>{alldata.patientname}</td>
                                    <td><input type="checkbox" defaultChecked/></td>
                                </tr>
                                <tr>
                                    <td>年龄</td>
                                    <td>{alldata.patientage}</td>
                                    <td><input type="checkbox" defaultChecked/></td>
                                </tr>
                                <tr>
                                    <td>性别</td>
                                    <td>{alldata.patientsex}</td>
                                    <td><input type="checkbox" defaultChecked/></td>
                                </tr>
                                <tr>
                                    <td>详细信息</td>
                                    <td>{alldata.details}</td>
                                    <td><input type="checkbox" defaultChecked/></td>
                                </tr>

                                </tbody>
                            </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={this.state.isModalOpen} onRequestHide={this.hideModal}>
                <ModalHeader>
                    <ModalClose onClick={this.hideModal}/>
                    <ModalTitle>提示:</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p className={this.state.error?'text-red':'text-green'}>
                        {this.state.actionResult}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-default' onClick={this.hideModal}>
                        关闭
                    </button>
                </ModalFooter>
            </Modal>

        </div>)};
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
        all: state.mdicalrecordreducer.data
    };
}
const reduxSignupForm = reduxForm({
    form: 'SignForm',
    validate
})(Search);
export default connect(mapStateToProps,{ fetchMdicalrecordshare,fetchMdicalrecorddetial })(reduxSignupForm);