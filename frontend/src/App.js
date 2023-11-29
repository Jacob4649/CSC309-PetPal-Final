import './App.css';
import { useEffect, useState } from 'react';
import ApplicationsComponent from './Components/ApplicationsComponent/ApplicationsComponent';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import UpdateShelter from './Components/UpdateShelter/UpdateShelter';


function App() {
  const [credentialsLoading, setCredentialsLoading] = useState(true)
  useEffect(() => {
    fetch("http://127.0.0.1:8000/token/",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            "email": "s1@mail.com",
            "password": "12345678"
          }
        )
      }).then((res => res.json())).then(data => {
        localStorage.setItem("token", data.access)
        setCredentialsLoading(false)
      })
  }, [])
  return (
    <div className="App">
      {credentialsLoading ? <></> : <><UpdateShelter shelter_id={4} /></>}
    </div>
  );
}

export default App;
