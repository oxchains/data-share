/**
 * Created by oxchain on 2017/9/28.
 */

import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchselfinfo } from '../actions/auth'
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

class Selfinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            spin : false,
            error: null,
            actionResult: ''
        };
    }

    hideModal = () => {
        this.setState({
            isModalOpen: false
        });
    };

    handleFormSubmit({ userId, userName, userInfo, userType }) {
        this.setState({ spin:true });
        if(userId && userName && userInfo && userType)
            this.props.fetchselfinfo({ userId, userName, userInfo,userType }, err => {
                this.setState({ isModalOpen: true , error: err , actionResult: err||'保存成功!' , spin:false });
            });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert alert-danger alert-dismissable">
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    renderField({ input, label, type, icon, meta: { touched, error } }) {
        return (
            <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
                <input {...input} placeholder={label} type={type} className="form-control"/>
                <span className={`form-control-feedback`}></span>
                <div className="help-block with-errors">{touched && error ? error : ''}</div>
            </div>
        )}

    render() {
        const { handleSubmit} = this.props;

        return (
            <div>
                <div className="login-box">
                    <div className="login-box-body">
                        <p className="login-box-msg" style={{fontSize: 24+'px'}}>个人信息认证</p>
                        {this.renderAlert()}
                        <form className="form-signin" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                            <Field name="userId" component={this.renderField} type="text"  label="真实姓名"  />
                            <Field name="userName" component={this.renderField} type="text"  label="身份证号码" />
                            <Field name="userInfo" component={this.renderField} type="text" label="用户信息" />
                            <Field name="userType" component={this.renderField} type="text" label="用户类型"  />
                            <div className="row">
                                <div className="col-xs-8">
                                </div>
                                <div className="col-xs-4">
                                    <button type="submit" className="btn btn-primary btn-block btn-flat"><i className={`fa fa-spinner fa-spin ${this.state.spin?'':'hidden'}`}></i> 保存</button>
                                </div>
                            </div>
                        </form>
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
            </div>
        );
    }
}


const validate = values => {
    const errors = {};

    if(!values.name) {
        errors.name = '用户名不能为空';
    }

    if(!values.mobile) {
        errors.mobile = '身份证号号不能为空';
    }

    if(!values.password) {
        errors.password = '不能为空';
    }

    if(!values.passwordConfirm) {
        errors.passwordConfirm = '不能为空';
    }
    return errors
};

function mapStateToProps(state) {
    return {
        success: state.auth.authenticated,
        errorMessage: state.auth.error
    };
}

const reduxSignupForm = reduxForm({
    form: 'SignForm',
    validate
})(Selfinfo);

export default connect(mapStateToProps, { fetchselfinfo })(reduxSignupForm);