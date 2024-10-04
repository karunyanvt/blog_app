import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            console.log('Fetching data from:', url); 
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    if (axios.isCancel(err)) {
                        console.log('Request canceled:', err.message);
                    } else {
                        console.error('Error fetching data:', err.response?.status, err.message);
                        setFetchError(err.response ? `Error ${err.response.status}: ${err.response.data}` : err.message);
                        setData([]);
                    }
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData(dataUrl);

        return () => {
            isMounted = false;
            source.cancel();
        };
    }, [dataUrl]);

    return { data, fetchError, isLoading };
};

export default useAxiosFetch;
