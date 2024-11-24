import '../styles/header.css'
import { NavLink } from 'react-router-dom'

export default function HeaderLink({link, text}){

    return (
        <NavLink to={link} end  
            className={({ isActive, isPending }) => {
                return isActive ? "headerBox_link headerBox_link--active" : "headerBox_link"
            }  
        }>{text}</NavLink>
    )
}