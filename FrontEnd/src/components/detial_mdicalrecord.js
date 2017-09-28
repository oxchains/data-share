/**
 * Created by oxchain on 2017/9/25.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMdicalrecorddetial } from '../actions/mdicalrecord';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
class Detial extends Component {
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
    componentWillMount() {
        this.props.fetchMdicalrecorddetial();
    }
    handleFormSubmit() {
        this.setState({ spin:true });
            this.props.fetchMdicalrecorddetial(err => {
                this.setState({ isModalOpen: true , error: err , actionResult: err||'分享成功!' , spin:false });
            });
    }

    renderRow(item,index){
        // console.log(item)
        return (
            <ul  key={index} className="list-style">
                <li className="ul-style col-lg-2">姓名: {item.name}</li>
                <li className="ul-style col-lg-2">性别: {item.sex}</li>
                <li className="ul-style col-lg-2">年龄: {item.year} 岁</li>
            </ul>
        )
    }
    handleRow(item,index){
        return(
            <tr key={index} className="">
                
                <td className="td-left">{item.name}</td>
                <td className="td-wrap">{item.detial}</td>
                <td className="td-right"><input type="checkbox"/></td>
            </tr>
        )
    }
    render() {
        const itemRow =[
            {name:"张三三",sex:"女",year:"18"}
        ]
        const linkRow =[
            {name:"视力",detial:"1234567890"},
            {name:"视力",detial:"1234567890"},
            {name:"视力",detial:"1234567890123456789012345678901234512345678901123456789012345678901234567890123456789012345678901234567890"},
            {name:"视力",detial:"1234567890"},
            {name:"视力",detial:"1234567890"},
            {name:"视力",detial:"1234567890"},
            {name:"视力",detial:"1234567890123456789012345678901234512345678901123456789012345678901234567890123456789012345678901234567890"},
            {name:"视力",detial:"1234567890"}
        ]

        // const { handleSubmit} = this.props;
        return (
            <div>
                <section className="content">
                    <div className="text-center "><h2>北京协和医院</h2></div>
                    <hr className="hr-color"/>
                        {itemRow.map(this.renderRow)}
                        <div className="clear"></div>
                    <form action="" className="text-center" onSubmit={this.handleFormSubmit.bind(this)}>
                        <div className="box-body table-responsive no-padding ">
                            <table className="table-width table-border table-hover">
                                <tbody>
                                <tr>
                                    <th>项目名称</th>
                                    <th>详细信息</th>
                                    <th></th>
                                </tr>
                                {linkRow.map(this.handleRow)}
                                </tbody>
                            </table>
                        </div>
                        <button type="submit" className="btn btn-primary "><i className={` ${this.state.spin?'':'hidden'}`}></i>分享</button>
                    </form>

                </section>

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

        )
    }
}

function mapStateToProps(state) {
    // console.log(state.mdicalrecord)
    return {
        success: state.auth.authenticated,
        errorMessage: state.auth.error
    };
}

export default connect(null, { fetchMdicalrecorddetial })(Detial);
