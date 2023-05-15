
import axios from 'axios';
import './App.css';
// import { DoughnutChart } from './components/doughnutChart';
import Linecharts from './components/linecharts';
import { useEffect, useState } from 'react';



function App() {
  const URL= "https://disease.sh"
  const [cases, setCases] = useState([])
  const [labels, setLabels] = useState([])
  const [loading, setLoading] = useState(true)
  const [countries, setCountries] = useState([])
  function fetchAll () {
    axios.get(URL+"/v3/covid-19/historical/all")
    .then((res)=>{
      // console.log(res.data)
      setLabels(Object.keys(res.data.cases))
      setCases(Object.values(res.data.cases))
    })
    .finally(()=>{
      setLoading(false)
    })

  }
  function fetchAllCountries (){
    axios.get(URL+"/v3/covid-19/countries")
    .then((res)=>{
      // console.log(res.data)
      let newArray = res.data.map((e)=>{
        return { 
          name: e.country ,
          iso3: e.countryInfo.iso3
        }
      })
      setCountries(newArray)
    })
    .finally(()=>{
      setLoading(false)
    })
    
  }
  function getDataBycoutry(iso3){
    axios.get(URL + "/v3/covid-19/historical/" + iso3).then((res)=>{
      setCases(Object.values(res.data.timeline.cases))
      
    })
  }
  function handleSelectChange(event){
    if (event.target.value==="all") {
      fetchAll()
    }else{
      getDataBycoutry(event.target.value)
    }
    
  }
  useEffect(() => {
    fetchAll()
    fetchAllCountries()
 
}, [])
  return (
    <main>
      <select onChange={handleSelectChange}>
        <option value="all" >All</option>
        {countries.map((e, i)=>{
        return (
          <option value={e.iso3} key={i}>
            {e.name}
          </option>
        )
      }
      )
      }
      </select>
      
      {/* <DoughnutChart></DoughnutChart> */}
      {loading ? <p>loading</p> : <Linecharts cases={cases} labels={labels}/>}
    </main>
  );
  }

export default App;
