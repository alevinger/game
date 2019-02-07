import React from 'react';
import './Square.css';

function Square(props) {
  let classes = ["square"];
  classes.push(props.highlight);

  return (
    <button className={classes.join(' ')} onClick={props.onClick}>
      {props.value}
    </button>
  );
}


export default Square;
