
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useAxios = ({
  url,
  method = 'GET',
  data = null,
  headers = {},
  dependencies = [],
  retryOnError = false,
  retryDelay = 3000,
  cacheResponse = false,
  transformResponse,
}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let result;
      
      if (cacheResponse) {
        const cachedData = localStorage.getItem(url);
        if (cachedData) {
          result = { data: JSON.parse(cachedData) };
        }
      }

      if (!result) {
        result = await axios({
          url,
          method,
          data,
          headers
        });

        if (cacheResponse) {
          localStorage.setItem(url, JSON.stringify(result.data));
        }
      }

      const transformedData = transformResponse ? transformResponse(result.data) : result.data;
      setResponse(transformedData);
      setError(null);
      setRetryCount(0);
    } catch (err) {
      setError(err);
      setResponse(null);
      if (retryOnError && retryCount < 3) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, retryDelay);
      }
    } finally {
      setLoading(false);
    }
  }, [url, method, JSON.stringify(data), JSON.stringify(headers), ...dependencies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, error, loading, refetch: fetchData };
};

export default useAxios;


// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';

// const useAxios = ({
//   url,
//   method = 'GET',
//   data = null,
//   headers = {},
//   dependencies = [],
//   retryOnError = false,
//   retryDelay = 3000,
//   cacheResponse = false,
//   transformResponse,
//   initialFetch = true,
// }) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(initialFetch);
//   const [retryCount, setRetryCount] = useState(0);

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading(true);
//       let result;
      
//       if (cacheResponse) {
//         const cachedData = localStorage.getItem(url);
//         if (cachedData) {
//           result = { data: JSON.parse(cachedData) };
//         }
//       }

//       if (!result) {
//         result = await axios({
//           url,
//           method,
//           data,
//           headers
//         });

//         if (cacheResponse) {
//           localStorage.setItem(url, JSON.stringify(result.data));
//         }
//       }

//       const transformedData = transformResponse ? transformResponse(result.data) : result.data;
//       setResponse(transformedData);
//       setError(null);
//       setRetryCount(0);
//     } catch (err) {
//       setError(err);
//       setResponse(null);
//       if (retryOnError && retryCount < 3) {
//         setTimeout(() => {
//           setRetryCount(prev => prev + 1);
//           fetchData();
//         }, retryDelay);
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [url, method, JSON.stringify(data), JSON.stringify(headers), cacheResponse, retryOnError, retryDelay, retryCount, transformResponse]);

//   useEffect(() => {
//     if (initialFetch || dependencies.length > 0) {
//       fetchData();
//     } else {
//       setLoading(false);
//     }
//   }, [fetchData, initialFetch, ...dependencies]);

//   return { response, error, loading, refetch: fetchData };
// };

// export default useAxios;
