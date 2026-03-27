import React from "react";
import Dock from "./Dock/Dock";

const items = [
  {
    id: 1,
    icon: "ri-home-4-line",
    label: "Inicio",
    link: "#home",
  },
  {
    id: 2,
    icon: "ri-user-3-line",
    label: "Sobre mí",
    link: "#about",
  },
  {
    id: 3,
    icon: "ri-briefcase-4-line",
    label: "Proyectos",
    link: "#project",
  },
  {
    id: 4,
    icon: "ri-mail-line",
    label: "Contacto",
    link: "#contact",
  },
];

function Footer() {
  return (
    <div className="mt-32 pb-8 flex flex-col items-center relative z-10">
      {/* Flex container adaptif */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6">
        
        {/* Judul - paling atas di mobile */}
        <h1 className="text-2xl font-bold order-1 md:order-none">
          Portofolio
        </h1>

        {/* Ikon Sosmed - di tengah di mobile */}
        <div className="flex gap-3 order-2 md:order-none">
          <a href="https://github.com/rissss21"><i className="ri-github-fill ri-2x"></i></a>
          <a href="https://www.instagram.com/henryhans_"><i className="ri-instagram-fill ri-2x"></i></a>
          <a href="https://www.youtube.com/@henryhans"><i className="ri-youtube-fill ri-2x"></i></a>
        </div>

        {/* Dock - paling bawah di mobile */}
        <div className="order-3 md:order-none mt-15 md:mt-0  md:mb-0">
          <Dock 
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
