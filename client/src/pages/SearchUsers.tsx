import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../common/Navbar";
import Context from "../context/context";
import CountryData from "country-data";

const SearchUsers = () => {
  const context = useContext(Context);
  const navigate = useNavigate();

  // sets current page name on navbar
  const currentPage: string = "View Other Users";

  // sets user array based on fetched data
  // unfilteredUsers state is used to reset back to unfiltered array after filtering
  const [users, setUsers] = useState([]);
  const [unfilteredUsers, setUnfilteredUsers] = useState([]);

  // auto-navigates user back to login page if not logged in
  // if logged in, fetches data from user database
  useEffect(() => {
    context.isLoggedIn ? fetchUsers() : navigate("/");
  }, []);

  // fetches all user data on initial mount
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

  // filters by username, shows only results that matches the input
  const filterbyName = (input: string) => {
    const filtered = unfilteredUsers.filter((user) =>
      user.name.toLowerCase().includes(input)
    );
    setUsers(filtered);
  };

  return (
    <>
      <Navbar currentPage={currentPage} />
      <div className="banner search_users_banner"></div>
      <div className="search_userspage_container">
        {/* input form to allow users to filter users by username */}
        <div className="search_input_container">
          <div className="animal_search_label">Search by Username:</div>
          <input
            type="text"
            className="animal_search_input"
            onChange={(e) => filterbyName(e.target.value)}
          />
        </div>
        {/* table displays account username, country and animal spotlight */}
        {/* backend query sorts lower-case usernames alphabetically */}
        <table className="user_list_table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Country</th>
              <th>Animal Spotlight</th>
            </tr>
          </thead>
          {/* maps corresponding data from user database into one table row per user */}
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
                    </td>{" "}
                    <td>
                      <>
                        {" "}
                        {entry.spotlight.map((entry, index) => {
                          return (
                            <>
                              <Link
                                to={`/search/animals/${entry.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#0b1f04",
                                }}
                              >
                                <span>
                                  {(index ? ", " : "") +
                                    JSON.stringify(entry.name).replaceAll(
                                      `"`,
                                      ``
                                    )}
                                </span>
                              </Link>
                            </>
                          );
                        })}
                      </>
                    </td>
                  </tr>
                </tbody>
              </>
            );
          })}
        </table>
        {/* displays total active accounts using the length of the unfiltered user array */}
        <div style={{ textAlign: "center", paddingBottom: "1rem" }}>
          Total active accounts: {unfilteredUsers.length}
        </div>
      </div>
    </>
  );
};

export default SearchUsers;
