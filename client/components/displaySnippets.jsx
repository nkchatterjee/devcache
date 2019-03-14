import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const DisplaySnippets = props => {
  const snippetsArray = props.userSnippets;
  const snippetsDisplayArray = [];

  if(snippetsArray) {
    for (let i = 0; i < snippetsArray.length; i++) {
      snippetsDisplayArray.push(
        <div
          key={'snippet' + i}
          id={ snippetsArray[i].id }
        >
            <Button variant="outline-dark" className="tagged-snippet text-left" size='sm'>
              { snippetsArray[i].snippet }
            </Button>
        </div>
      );
    };
  }
  return (
    <div>
      {snippetsDisplayArray}
    </div>
  );
}

export default DisplaySnippets;
