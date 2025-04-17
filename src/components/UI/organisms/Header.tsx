import { Link, NavLink, useNavigate } from "react-router";
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

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 60px;
      border-radius: 50%;
    }

    span {
      font-weight: bold;
      font-size: 1.5rem;
      color: palevioletred;
    }
  }

  nav ul {
    display: flex;
    gap: 20px;
    list-style: none;
    margin: 0;
    padding: 0;

    li a {
      text-decoration: none;
      color: white;
      font-size: 1.2rem;

      &:hover {
        color: #ffc0e6;
      }

      &.active {
        color: palevioletred;
      }
    }
  }

  .userContainer {
    display: flex;
    align-items: center;
    gap: 10px;

    .profile {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      span {
        color: white;
        font-weight: bold;
      }
    }

    a,
    button {
      background-color: palevioletred;
      border: none;
      border-radius: 50px;
      padding: 6px 12px;
      text-decoration: none;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      transition: background-color 0.3s ease;
      cursor: pointer;

      &:hover {
        background-color: #ffc0e6;
        color: black;
      }
    }

    button {
      border: 1px solid white;
      background: transparent;
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
                    {loggedInUser?.role === "admin" && (
                        <li>
                            <NavLink to="/add">Add Product</NavLink>
                        </li>
                    )}
                    {loggedInUser?.role === "user" && (
                        <li>
                            <NavLink to="/liked">Liked Products</NavLink>
                        </li>
                    )}
                </ul>
            </nav>

            <div className="userContainer">
                {loggedInUser ? (
                    <>
                        <div className="profile">
                            <img
                                src={
                                    loggedInUser.profilePicture}
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
        </StyledHeader>
    );
};

export default Header;
