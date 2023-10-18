import React,{useState} from 'react';
import './App.css';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {

  const [search, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  const [itemData, setItemData] = useState('');
  const [tag, setTag] = useState('');
  const [name, setName] = useState('');
  const [social, setSocial] = useState('');
  const [views, setViews] = useState(0);
  const [like, setLike] = useState('');
  const [found, setFound] = useState(0);

  const [lgShow, setLgShow] = useState(false);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // console.log(search);
  }

  const handleEnterSearch = async e => {
    if(e.key === 'Enter') {
      const res = await axios.get(`https://api.unsplash.com/search/photos/?client_id=nG0xH-j9GhYVY6fCqQ724b8DiKY4jT4N4QPH5YQX1XA&query=${search}&per_page=250&orientation=squarish`);

      console.log(res.data.results);
      setTag(search);
      setResults(res.data.results);
      setFound(res.data.results.length);
      setSearchText('');
    } 
    else {
      const res = await axios.get(`https://api.unsplash.com/search/photos/?client_id=nG0xH-j9GhYVY6fCqQ724b8DiKY4jT4N4QPH5YQX1XA&query=${search}&per_page=250&orientation=squarish`);

      console.log(res.data.results);
      console.log(search);
      setTag(search);
      setResults(res.data.results);
      setFound(res.data.results.length);
      
    }
  }

  
  let link = `https://www.instagram.com/${social}`;

  const handleClick = async (itemId) => {

    const res = await axios.get(`https://api.unsplash.com/photos/${itemId}?client_id=nG0xH-j9GhYVY6fCqQ724b8DiKY4jT4N4QPH5YQX1XA&`);

    console.log(res.data);
    // imgId = res.data.urls.regular;
    setItemData(res.data.urls.regular);
    setName(res.data.user.name);
    setLike(res.data.likes);
    setSocial(res.data.user.instagram_username);
    setViews(res.data.views)
    setLgShow(true);
    // setResults(res.data.results)
            
  }

  let msg;
  if(found == 0) {
    msg = "No Results";
  } else {
    msg = `Results found for ${tag}`;
  }
  

  return (
    <div className="App">

        <div className="search">
          <input 
            type='text' 
            className='input' 
            placeholder='Search Images here...' 
            onChange={handleSearchChange}
            onKeyPress={handleEnterSearch}
            value={search} 
          />
          {/* <button onClick={handleSubmit}>Search</button> */}
        </div>

        <h3>{msg}</h3>

        {}

        <div className="data">
          {
            results.map((item) => {
              return  <img key={item.id} src={item.urls.regular} onClick={() => handleClick(item.id)}/>
            })
          }

        </div>

                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            {tag}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <img src={itemData}/>
                        <p><i className="bi bi-hand-thumbs-up-fill"></i> {like}</p>
                          <p>Uploaded by <i>{name}</i></p>
                          <p><i className="bi bi-eye-fill"></i> Total {views} views</p>  
                          <a href={link} target='_blank' ><i className="bi bi-instagram"></i> {social}</a>
                          
                        </Modal.Body>
                      </Modal>

    </div>
  );
}

export default App;
