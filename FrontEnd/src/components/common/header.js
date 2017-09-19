/**
 * Created by oxchain on 2017/9/12.
 */
import React,{ Component }from 'react';
// import {connect} from 'react-redux';
import {Link} from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.renderLink = this.renderLink.bind(this);
    }
    renderLink({path, title}) {
        return (<li key={title} className="navli">
            <Link to={path}><span className="spancolor">{title}</span></Link>
        </li>)
    }
    render(){
        const links = [
            {path:'/', title:'首页'},
            {path:'test', title:'第二页'},
        ];
        return(
            <div>
                <nav className="navbar navbar-inverse">
                    <ul className="sidebar-menu">
                        { links.map(this.renderLink) }
                    </ul>
                </nav>
            </div>
        )
    }
}
export default Header;