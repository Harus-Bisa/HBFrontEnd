import React from "react";
import SearchIcon from '@material-ui/icons/Search';

function SearchBar(props){
    var [search, setSearch] = React.useState();

    const handleChange = (event) =>{
        setSearch(search = event.target.value)
        props.find(search)
    }
    return(
        <div className='search-bar'>
            <div className="col-3" style={{display:'flex'}}>
                <SearchIcon className='icon'/>
            </div>
            <div className="col-9">
                <input
                    type = 'text'
                    placeholder={props.placeholder}
                    value = {search}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

SearchBar.defaultProps = {
    placeholder: "find something",
    find: ((search) => {return "not found"})
}

export default SearchBar;