import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import card from "./assets/images/card.png";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(20);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://db.ygoprodeck.com/api/v7/cardinfo.php"
        );
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        setError("Failed to fetch card data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const page = new URLSearchParams(location.hash.replace("#", "?")).get(
      "page"
    );
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [location]);

  // Get current cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(
    indexOfFirstCard,
    indexOfFirstCard + cardsPerPage
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (searchResults) => {
    setFilteredData(searchResults);
  };

  const handleFilter = (filteredResults) => {
    setFilteredData(filteredResults);
    setCurrentPage(1);
  };

  return (
    <>
      <div className=" bg-background-alternative bg-repeat bg-center bg-slate-900 h-screen  w-full min-h-screen  overflow-y-auto overflow-hidden relative custom-scrollbar ">
        <Navbar onFilter={handleFilter} />
        <Search onSearch={handleSearch} />

        {error && <div>{error}</div>}
        {loading ? <div>Loading...</div> : <Card data={currentCards} />}
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={filteredData.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
