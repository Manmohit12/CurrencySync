import {useState ,useEffect} from 'react';

function useCurrencyInfo(currency){
    const [data,setData]=useState({});
    useEffect(()=>{ 
      fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_pbub2iJ35REbfN3iQkf1DEd6ooiKBYPLwZ2kIIJ9&currencies=EUR%2CUSD%2CCAD`
  ).then((res)=>res.json())
  .then((res)=>setData(res.data))
  },[currency])
  console.log(data)
  return data 
}
export default useCurrencyInfo;
