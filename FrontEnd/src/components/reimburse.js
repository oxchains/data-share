
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { fetchReimburse, reimburseAction } from '../actions/mdicalrecord';
import { Link, browserHistory } from 'react-router';

class Reimburse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      biz          : JSON.parse(localStorage.getItem('biz')),
    }
  }
  componentWillMount() {
    this.props.fetchReimburse(this.props.params.serial);
  }

  render() {
    const { item } = this.props;

    if(!item) {
      return <div>Loading...</div>;
    }

    return (
       <div>
         21
       </div>
     )
  }

  handleConfirm() {
    this.setState({ spinConfirm:true });
    this.props.reimburseAction(this.props.item.serial, 1, null, err=>{
      this.setState({ isModalOpen: true , error: err , actionResult: err||'确认成功!' , spinConfirm:false });
      this.props.fetchReimburse(this.props.params.serial);
    });
  }

  handleReject() {
    this.setState({ spinReject:true });
    this.props.reimburseAction(this.props.item.serial, 0, null, err=>{
      this.setState({ isModalOpen: true , error: err , actionResult: err||'拒绝成功!' , spinReject:false });
      this.props.fetchReimburse(this.props.params.serial);
    });
  }
}

function mapStateToProps(state) {
  return {
    item: state.reimburse.item
  };
}

export default connect(mapStateToProps, { fetchReimburse, reimburseAction })(Reimburse);