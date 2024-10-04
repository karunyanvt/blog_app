import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([]); // State for posts
    const [search, setSearch] = useState(''); // State for search input
    const [searchResults, setSearchResults] = useState([]); // State for search results

    // Fetch posts data using the custom hook
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3000/posts');

    // Update posts state when data changes
    useEffect(() => {
        if (fetchError) {
            console.error("Error fetching data:", fetchError); // Log error if it occurs
            return; // Optionally handle the error state in your UI
        }

        if (Array.isArray(data)) {
            console.log("Fetched data:", data); // Log fetched data to inspect its structure
            setPosts(data);
        } else {
            console.warn("Fetched data is not an array:", data); // Warn if data is not an array
        }
    }, [data, fetchError]);

    // Filter posts based on search input
    useEffect(() => {
        const filteredResults = posts.filter((post) => {
            // Safely access body and title
            const body = post.body ? post.body.toLowerCase() : ''; 
            const title = post.title ? post.title.toLowerCase() : ''; 
            return body.includes(search.toLowerCase()) || title.includes(search.toLowerCase());
        });

        setSearchResults(filteredResults.reverse()); // Set filtered results in reverse order
    }, [posts, search]);

    return (
        <DataContext.Provider value={{
            search,
            setSearch,
            searchResults,
            fetchError,
            isLoading,
            posts,
            setPosts
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
