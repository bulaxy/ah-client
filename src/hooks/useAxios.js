import { useEffect, useState } from "react"
import axios from 'axios'
import useUpdateEffect from "./useUpdateEffect";

export const useAxios = (url, method, payload, dependency) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!(typeof dependency?.[0] === 'boolean' && dependency?.[0] === false)) {
    
    
    // axios
    //   .request({
    //     method,
    //     url,
    //     ...payload
    //   })
    //   .then(response => {
    //     setData(response)
    //   })
    //   .catch(error => setError(error.message))
    //   .finally(() => setLoading(true));
    }
  }, dependency);

  return { data, error, loading };
};
