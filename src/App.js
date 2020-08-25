import React, { useState, useEffect } from 'react';
import ImageCard from './components/imageCard';
import ImageSearch from './components/imageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    const cors_anywhere = 'https://cors-anywhere.herokuapp.com/';
    const api_key = '18030393-c158d077487f66fa0e5a7ce51'
    fetch(`${cors_anywhere}https://pixabay.com/api/?key=${api_key}&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
  }, [term]);


  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />

      { !isLoading && images.length === 0 && <h1 className="text-6xl text-center mx-auto mt-32">No results found.</h1> }

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        : <div className="grid grid-cols-3 gap-4">
          {images.map(image => (
            <ImageCard key={image.id} image={image} />
          )
          )}

        </div>}
    </div>
  );
}

export default App;
