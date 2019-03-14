import React from 'react';
import { InputGroup, FormControl, Button, Nav, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const addSnip = props => {

  return (
    <React.Fragment>
      <textarea
        placeholder='Add snippet...'
        onChange={props.enterSnippet}
      />

      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1 inputGroup-sizing-default">Description</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          id='comment'
          type='text'
          name='comment'
          value={props.comments}
          onChange={props.enterComments}
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1 inputGroup-sizing-default">Project</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          aria-describedby="basic-addon1"
          id='project-tag'
          type='text'
          name='projectTag'
          value={props.project}
          onChange={props.enterProject}
        />
      </InputGroup>

      <InputGroup className="mb-1">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1 inputGroup-sizing-default">Tags</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          id='project-tag'
          type='text'
          name='projectTag'
          value={props.tags}
          onChange={props.enterTags}
          aria-describedby="basic-addon1"
        />
        <InputGroup.Append>
          <Link to="/mysnippets"><Button variant="success" onClick={props.createSnippet}>Submit Snippet</Button></Link>
        </InputGroup.Append>
      </InputGroup>
    </React.Fragment>
  );
};

export default addSnip;