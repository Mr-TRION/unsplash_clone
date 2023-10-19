import React,{useState} from 'react';
import './App.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function App() {

  // setting up hooks
  const [search, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  // setting up modal details hooks
  const [img, setImg] = useState('');
  const [searchName, setsearchName] = useState('');
  const [userName, setuserName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [views, setViews] = useState(0);
  const [like, setLike] = useState('');
  const [found, setFound] = useState(0);
  

  // Modal hooks
  const [lgShow, setLgShow] = useState(false);

  // Input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    // console.log(search);
  }

  // Handling submission
  const handleEnterSearch = async e => {
    if(e.key === 'Enter') {
      const res = await axios.get(`https://api.unsplash.com/search/photos/?client_id=nG0xH-j9GhYVY6fCqQ724b8DiKY4jT4N4QPH5YQX1XA&query=${search}&per_page=250&orientation=squarish`);

      console.log(res.data.results);
      setsearchName(search);
      setResults(res.data.results);
      setFound(res.data.results.length);
      setSearchText('');
    } 
  }

  
  let link = `https://www.instagram.com/${instagram}`;


  // Handling single photo details
  const modalClick = async (itemId) => {

    const res = await axios.get(`https://api.unsplash.com/photos/${itemId}?client_id=nG0xH-j9GhYVY6fCqQ724b8DiKY4jT4N4QPH5YQX1XA&`);

    // console.log(res.data);
    setImg(res.data.urls.regular);
    setuserName(res.data.user.name);
    setLike(res.data.likes);
    setInstagram(res.data.user.instagram_username);
    setViews(res.data.views)
    setLgShow(true);            
  }

  let msg;
  if(found == 0) {
    msg = "No Results";
  } else {
    msg = `Results found for ${searchName}`;
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
        </div>
        <h3>{msg}</h3>
        <div className="data">
          {
            results.map((item) => {
              return  <img key={item.id} src={item.urls.regular} onClick={() => modalClick(item.id)}/>
            })
          }
        </div>

       {/* Setting Modal  */}
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {searchName}
            </Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <img src={img}/>
            <p><i className="bi bi-hand-thumbs-up-fill"></i> {like}</p>
              <p>Uploaded by <i>{userName}</i></p>
              <p><i className="bi bi-eye-fill"></i> Total {views} views</p>  
              <a href={link} target='_blank' ><i className="bi bi-instagram"></i> {instagram}</a>
              
          </Modal.Body>
        </Modal>

    </div>
  );
}

export default App;
