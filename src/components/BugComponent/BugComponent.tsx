import React, { Component } from 'react';

class BugComponent extends Component {
  componentDidMount(): void {
    console.log('test');
    throw new Error('Error caramba!');
  }

  render(): React.ReactNode {
    return <div>Text for error</div>;
  }
}

export default BugComponent;
