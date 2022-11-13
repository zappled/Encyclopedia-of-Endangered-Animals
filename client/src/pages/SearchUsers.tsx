import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar";
import Context from "../context/context";
import CountryData from "country-data";

const SearchUsers = () => {
  const context = useContext(Context);
  const navigate = useNavigate();
  const currentPage: string = "View Other Users";
  const [users, setUsers] = useState([]);

  const [unfilteredUsers, setUnfilteredUsers] = useState([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  useEffect(() => {
    context.isLoggedIn ? fetchUsers() : navigate("/");
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/search/users");
      const data = await response.json();
      setUsers(data);
      setUnfilteredUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterbyName = (input) => {
    setIsFiltered(true);
    const filtered = unfilteredUsers.filter((animal) =>
      animal.name.toLowerCase().includes(input)
    );
    setUsers(filtered);
    if (!input) {
      setIsFiltered(false);
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="banner search_users_banner"></div>
      <div className="search_userspage_container">
        <div className="search_input_container">
          <div className="animal_search_label">Search by Username:</div>
          <input
            type="text"
            className="animal_search_input"
            onChange={(e) => filterbyName(e.target.value)}
          />
        </div>
        <table className="user_list_table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Country</th>
              <th>Animal Spotlight</th>
            </tr>
          </thead>
          {users.map((entry: any, key: any) => {
            return (
              <>
                <tbody key={key}>
                  <tr style={{ borderBottom: "1px solid black" }}>
                    <td>{entry.name}</td>
                    <td>
                      {" "}
                      <img
                        alt=""
                        className="country_flag"
                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${entry.country}.svg`}
                      />
                      {CountryData.countries[entry.country].name}
                    </td>
                    <td>{entry.favourites}</td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default SearchUsers;
