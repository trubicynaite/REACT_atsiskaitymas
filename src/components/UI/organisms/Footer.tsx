import styled from "styled-components";
import { Link } from "react-router";

const StyledFooter = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  >div.topSection {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    >div.socials {
      display: flex;
      gap: 15px;

      >a {
        color: palevioletred;
        font-size: 1.5rem;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #ffc0e6;
        }
      }
    }
  }

  >div.links {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    font-size: 0.9rem;

    >a {
      color: #ccc;
      text-decoration: none;

      &:hover {
        color: #ffc0e6;
      }
    }
  }

  >div.bottom {
    font-size: 0.8rem;
    color: #999;
  }
`;

const Footer = () => {

    return (
        <StyledFooter>
            <div className="topSection">
                <div className="socials">
                    <a href="https://instagram.com" target="_blank">Instagram</a>
                    <a href="https://facebook.com" target="_blank">Facebook</a>
                    <a href="https://tiktok.com" target="_blank">TikTok</a>
                    <a href="https://linkedin.com" target="_blank">LinkedIn</a>
                </div>
            </div>

            <div className="links">
                <Link to="/cookies">Cookies</Link>
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms & Uses</Link>
            </div>

            <div className="bottom">
                2025. Jovita Trubicynaite. All rights reserved.
            </div>
        </StyledFooter>
    );
};

export default Footer;
