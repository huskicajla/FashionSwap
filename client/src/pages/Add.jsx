import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Add = () => {

  const [value, setValue] = React.useState('');

  console.log(value);

  return (
    <div className="addPage">
      <div className="content">
        <input type="text" placeholder='Title' />
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h2>Publish</h2>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{display:"none"}}type="file" id="file" name=""/>
          <label className="file" htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a Draft</button>
            <button>Publish</button>
          </div>
        </div>
        <div className="item">
          <h2>Category</h2>
          <div className="cat">
          <input type="radio" name="cat" value="women" id="women"/>
          <label htmlFor="women">Women</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="men" id="men"/>
          <label htmlFor="men">Men</label>
          </div>
          <div className="cat">
          <input type="radio" name="cat" value="kids" id="kids"/>
          <label htmlFor="kids">Kids</label>
          </div>
          <div className="cat"><input type="radio" name="cat" value="accessories" id="accessories"/>
          <label htmlFor="accessories">Accessories</label>
          </div>
          <div className="cat"><input type="radio" name="cat" value="jewelry" id="jewelry"/>
          <label htmlFor="jewelry">Jewelry</label>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Add;
