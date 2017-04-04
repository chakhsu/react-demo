import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile.jsx';

const props = {
  name: 'Chakhsu Lau'
};

ReactDOM.render(<Profile {...props} />, document.getElementById('root'));
