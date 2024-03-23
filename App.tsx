import React, { useEffect, useState } from 'react';
import StackNavigation from './src/navigation';
// import axios from 'axios';

function App(): React.JSX.Element {
  // const [diseaseName, setDiseaseName] = useState('');

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://10.0.2.2:5000/getDiseaseName');
  //     setDiseaseName(response.data);
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <StackNavigation />
  );
}

export default App;
