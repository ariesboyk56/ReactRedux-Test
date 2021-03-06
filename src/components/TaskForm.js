import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';
class TaskForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
            name: '',
            status: true
        }
    }
    componentWillMount(){
        if (this.props.itemEditting) {
            this.setState({
                id: this.props.itemEditting.id,
                name: this.props.itemEditting.name,
                status: this.props.itemEditting.status
            });
        }
    }
    componentWillReceiveProps(nextProps){
        if (nextProps && nextProps.itemEditting) {
            this.setState({
                id: nextProps.itemEditting.id,
                name: nextProps.itemEditting.name,
                status: nextProps.itemEditting.status
            });
        }else if (!nextProps.itemEditting){
            this.setState({
                id: '',
                name: '',
                status: true
            });
        }

    }
  onCloseForm=()=>{
    this.props.onCloseForm();
  }
  onChange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if (name==='status') {
        value= target.value==='true'? true:false;
    }
    this.setState({
        [name]: value
    });
  }
  onSubmit=(event)=>{
    event.preventDefault();
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onCloseForm();
  }
  onClear=()=>{
    this.setState({
        name:'',
        status: false
    });
  }
    render() {
        var {id} = this.state;
        if(!this.props.isDisplayForm) return null;
    return (

       <div className="panel panel-warning">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                        {id !== '' ? 'Cập Nhật Công Việc':'Thêm Công Việc'}
                          <span className="fa fa-times-circle text-right"
                                onClick={this.onCloseForm}
                          ></span>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Tên :</label>
                                <input  type="text"
                                        className="form-control"
                                        name='name'
                                        value={this.state.name}
                                        onChange={this.onChange}
                                />
                            </div>
                            <label>Trạng Thái :</label>
                            <select className="form-control"
                                    name='status'
                                    value={this.state.status}
                                    onChange={this.onChange}
                            >
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select>
                            <br/>
                            <div className="text-center">
                                <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu Lại</button>&nbsp;
                                <button type="button"
                                        className="btn btn-danger"
                                        onClick={this.onClear}
                                >
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
      
    );
  }
}
const mapStateToProps = state =>{
    return{
        isDisplayForm: state.isDisplayForm,
        itemEditting: state.itemEditting
    }
};

const mapDispatchToProps = (dispatch, props) =>{
    return{
        onSaveTask: (task) =>{
            dispatch(actions.saveTask(task));
        },
        onCloseForm: ()=>{
            dispatch(actions.closeForm());
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
