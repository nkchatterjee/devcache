import React from 'react';

import DisplaySnippets from '../components/displaySnippets.jsx';
import { Image, Navbar, Form, Dropdown, FormControl, Button, Nav, InputGroup } from 'react-bootstrap';


const sideBar = function(props) {
  
  const tagSet = new Set(props.userTags);
  const tagArray = Array.from(tagSet);
  const displayArray = [];

  // TODO
  // get all snippets by current user
  // then, filter all current user's snippets by props.search
  //

  

  for (let i = 0; i < tagArray.length; i++) {
    displayArray.push(
      <p 
        onClick={ (event) => props.grabSnippetsFromDB(event) }
        id={ tagArray[i] }
        key={ i }
      >
        { tagArray[i] }
      </p>
    )
  };

  function massOnChange(event) {
    console.log()
    event.persist()
    props.enterSearch(event);
    props.trieFindChildren(event);
  }

  return (
    <div className='side-bar'>
      <div className='search-bar'>
        <FormControl
          aria-describedby="basic-addon1"
          id='search-field'
          type='text'
          name='search-bar'
          placeholder='Search my snippets'
          value={props.search}
          onChange={massOnChange}
        />
      </div>
      <DisplaySnippets
        userSnippets={props.userSnippets}
        getSnippetsMineOnly={props.getSnippetsMineOnly}
      />
    </div>
  );
};

export default sideBar;