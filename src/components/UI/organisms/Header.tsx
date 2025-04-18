import { Link, NavLink, useNavigate, useLocation } from "react-router";
import styled from "styled-components";
import { useContext } from "react";
import UsersContext from "../../../contexts/UsersContext";

const StyledHeader = styled.header`
  height: 80px;
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1a1a1a;

  >div.logo {
    display: flex;
    align-items: center;
    gap: 15px;

    >img {
      height: 60px;
      border-radius: 50%;
    }

    >span {
      font-weight: bold;
      font-size: 1.4rem;
      color: #ff69b4;
    }
  }

  >nav {
    flex: 1;
    display: flex;
    justify-content: center;

    >ul {
    display: flex;
    gap: 15px;
    list-style: none;
    margin: 0;
    padding: 0;

    >li{
    >a {
      text-decoration: none;
      font-weight: bold;
      font-size: 1rem;
      color: #ffa1d0;
      border-radius: 20px;
      background-color: #242424;
      padding: 10px;
      border: 1px solid #ffa1d0;

      &:hover {
        color: #ff69b4;
        border: 1px solid #ff69b4;
      }

      &.active {
        color: #ff69b4;
        border: 1px solid #ff69b4;
      }
     }
    }
  }
}

  >div.userContainer {
    display: flex;
    align-items: center;
    gap: 10px;

    >div.profile {
      display: flex;
      align-items: center;
      gap: 8px;

    >img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

    >span {
        color: white;
        font-weight: bold;
      }
    }

   >a, button {
      background-color: #ff69b4;
      border: none;
      border-radius: 50px;
      padding: 6px 12px;
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        background-color: #ffa1d0;
        color: black;
        transition: color 0.3s ease;
      }
    }

    >button {
      background: #ff69b4;
    }
  }
`;

const Header = () => {
  const { loggedInUser, setLoggedInUser } = useContext(UsersContext)!;
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const location = useLocation();
  const notHomePage = location.pathname === "/register" || location.pathname === "/login";

  return (
    <StyledHeader>
      <div className="logo">
        <img
          src="https://static.vecteezy.com/system/resources/previews/038/497/937/non_2x/sparkling-heart-love-emoji-icon-object-symbol-gradient-art-design-cartoon-isolated-background-pink-heart-emoji-vector.jpg"
          alt="logo"
        />
        <span>BeautyBoutique</span>
      </div>

      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {!notHomePage && loggedInUser && (
            <li>
              <NavLink to="/add">Add Product</NavLink>
            </li>
          )}
          {!notHomePage && loggedInUser?.role === "user" && (
            <li>
              <NavLink to="/liked">Liked Products</NavLink>
            </li>
          )}
        </ul>
      </nav>
      {!notHomePage && (
        <div className="userContainer">
          {loggedInUser ? (
            <>
              <div className="profile">
                <img
                  src={loggedInUser.profilePicture}
                  alt={loggedInUser.username}
                />
                <span>{loggedInUser.username}</span>
              </div>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </StyledHeader>
  );
};

export default Header;
