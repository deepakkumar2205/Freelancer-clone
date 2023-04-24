import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Context from "../../Context/Context";
import logo from "../../assets/freelancer.png";
import "./Navbar.css";
import  { BiLogOutCircle } from 'react-icons/bi'

function NavComp() {
  const navigate = useNavigate();
  const contextData = useContext(Context);

  function handleLogout() {
    localStorage.clear();
    contextData.setNavFlag(false);
    navigate("/login");
  }
  const role = localStorage.getItem("role-token")
  const client = '11091cf6097423b33d510424'

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top">
        <Container className="">
          <Navbar.Brand onClick={() => navigate("/")} className="overflow-auto">
            <img src={logo} alt="" className="imageStyle " />
            <b className="companyFont">Freelancers</b>
          </Navbar.Brand>
          {contextData.navFlag ? (
            <>
              {" "}
              <Nav className="me-auto">
                {
                  role === client? 
                  <>
                  <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                  <Nav.Link onClick={() => navigate("/projects")}>Projects</Nav.Link>
                  <Nav.Link onClick={() => navigate("/post")}>Post</Nav.Link>
                  <Nav.Link onClick={() => navigate("/myprojects")}>My-Projects</Nav.Link>
                  </>
                  :
                  <>
                  <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                  <Nav.Link onClick={() => navigate("/projects")}>Projects</Nav.Link>
                  <Nav.Link onClick={() => navigate("/applied")}>Applied</Nav.Link>
                  </>
                }
              </Nav>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-toggle="tooltip"
                onClick={handleLogout}
                data-bs-placement="bottom"
                data-bs-custom-class="custom-tooltip"
                data-bs-title="This top tooltip is themed via CSS variables."
              >
                {window.innerWidth < 770 ? <BiLogOutCircle/>:"LogOut"}
              </button>
            </>
          ) : (
            <>
              <Nav className="me-auto"></Nav>
            </>
            
          )}
        </Container>
      </Navbar>
      <br /><br /><br />
    </>
  );
}

export default NavComp;
