import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [title, setTitle] = useState("");
  const [sortPrice, setSortPrice] = useState(true);
  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 500]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);

  return (
    <>
    <div className="App">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          title={title}
          setTitle={setTitle}
          priceMin={priceMin}
          priceMax={priceMax}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
          setFetchRangeValues={setFetchRangeValues}
          fetchRangeValues={fetchRangeValues}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          sortPrice={sortPrice}
          setSortPrice={setSortPrice}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  title={title}
                  setTitle={setTitle}
                  priceMin={priceMin}
                  priceMax={priceMax}
                  setPriceMin={setPriceMin}
                  setPriceMax={setPriceMax}
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  setLimit={setLimit}
                  sortPrice={sortPrice}
                  setSortPrice={setSortPrice}
                  total={total}
                  setTotal={setTotal}
                />
              }
            />
            <Route path="/offers/:id" element={<Offer token={token}/>} />

            <Route
              path="/signup"
              element={
                <Signup
                  token={token}
                  setToken={setToken}
                />
              }
            />

            <Route
              path="/login"
              element={
                <Login
                  token={token}
                  setToken={setToken}
                />
              }
            />

            <Route path="/publish" element={<Publish token={token} />} />

            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
    </>
  );
}

export default App;
