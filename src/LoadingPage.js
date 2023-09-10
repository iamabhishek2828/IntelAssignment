import React, { useState, useEffect, useRef } from "react";
import "./LoadingPage.css";
import Lottie from "lottie-web";
import officeAnimationData from "./office.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoadingPage = () => {
  const [theme, setTheme] = useState("dark-theme");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [styleMeClicked, setStyleMeClicked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      toast("Switched to light theme", { type: "info" });
    } else {
      setTheme("dark-theme");
      toast("Switched to dark theme", { type: "info" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === "user@example.com" && formData.password === "password") {
      setAuthenticated(true);
      toast("Authentication successful", { type: "success" });
    } else {
      setAuthenticated(false);
      toast("Authentication failed", { type: "error" });
    }
  };

  const handleStyleMeClick = () => {
    setStyleMeClicked(true);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const container = useRef(null);

  useEffect(() => {
    const animation = Lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: officeAnimationData,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className="loading-container">
      <h1>IoSC i3</h1>
      {authenticated ? (
        <p>Welcome, {formData.name}!</p>
      ) : (
        <button
          className={`toggle-button ${styleMeClicked ? "styled" : ""}`}
          onClick={toggleTheme}
        >
          {theme === "dark-theme" ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
          Toggle Theme
        </button>
      )}
      <div className="content-container">
        <div className="lottie-container" ref={container}></div>
        <div className="details-box">
          {authenticated ? (
            <p>You are authenticated!</p>
          ) : (
            <form className="user-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <button
        className={`style-me-button ${styleMeClicked ? "styled" : ""}`}
        onClick={handleStyleMeClick}
      >
        Style Me
      </button>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default LoadingPage;


