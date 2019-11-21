import React from "react";
import { Menu, MenuItem} from "@material-ui/core";
import ButtonIcon from "../ButtonIcon/ButtonIcon";

export default function MenuOptions(props){
    var [anchorEl, setAnchorEl] = React.useState(null);
    var menuOpen = Boolean(anchorEl)
    const Trigger = props.trigger;
    const makeMenuItems = () =>{
        var menuItems = [];
        for (let i=0; i<props.options.length; i++){
            menuItems.push(
                <MenuItem key={i}>{props.options[i]}</MenuItem>
            )
        }
        return menuItems;
    }
    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget)
    }
    return(
        <div>
            <Trigger icon={props.icon} className={props.className} onClick={handleClick}/>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={() => setAnchorEl(null)}
            >
                {makeMenuItems()}
            </Menu>
            
        </div>
    )
}

MenuOptions.defaultProps={
    trigger: ButtonIcon,
    options:["Settings"]
}