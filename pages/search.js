import Header from "../components/header";
import {API_KEY, CONTEXT_KEY} from "../keys";
import { useRouter } from 'next/dist/client/router';
import SearchResults from "../components/searchResults";







function Search(results){

    const router = useRouter();
    
    return <div>
        <head>
            <title>Search Results</title>
        </head>

        {/* Header */}
        <Header />

        {/* Search Results */}
        <SearchResults results={results} />
    </div>
}

export default Search;


export async function getServerSideProps(context){
    const useDummyData = false;
    const startIndex = context.query.start || "0";

    const data = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`).then((response) => response.json());


    //Aftre the SERVER is rendered... pass the results to client..
    return{
        props:{
            results: data
        }
    }
}