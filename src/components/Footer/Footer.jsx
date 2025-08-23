import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";

function Footer({ custom }) {
  return (
    <>
      <footer
        className={`footer sm:footer-horizontal ${
          custom ? "bg-white" : "bg-second"
        } items-center p-4 lg:px-30`}
      >
        <aside className="sm:flex items-center justify-center sm:justify-start text-main w-full text-center">
          <Link to={"/"} className="w-full sm:w-auto">
            <img src={logo} alt="" className="w-full sm:w-40" />
          </Link>
          <span className="hidden sm:flex">|</span>
          <p>
            Copyright © {new Date().getFullYear()} - Yalla All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col justify-self-center gap-4 md:place-self-center md:justify-self-end">
          <a
            href="https://www.facebook.com/profile.php?id=61553501452544"
            target="_blank"
            className="text-main hover:text-black transition-colors"
          >
            <FaFacebook size={25} />
          </a>
          <a
            href="https://www.instagram.com/yalla879/?next=%2F"
            target="_blank"
            className="text-main hover:text-black transition-colors"
          >
            <FaInstagram size={25} />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=972546487767"
            target="_blank"
            className="text-main hover:text-black transition-colors"
          >
            <FaWhatsapp size={25} />
          </a>
          <a
            href="https://www.youtube.com/@-jc1ro"
            target="_blank"
            className="text-main hover:text-black transition-colors"
          >
            <FaYoutube size={25} />
          </a>
        </nav>
      </footer>
    </>
  );
}

export default Footer;
