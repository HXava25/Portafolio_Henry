import React from "react";
import Dock from "./Dock/Dock";

const items = [
  {
    id: 1,
    icon: "ri-home-4-line",
    label: "Inicio",
    onClick: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 2,
    icon: "ri-user-3-line",
    label: "Sobre mí",
    onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 3,
    icon: "ri-briefcase-4-line",
    label: "Proyectos",
    onClick: () => document.getElementById('project')?.scrollIntoView({ behavior: 'smooth' }),
  },
  {
    id: 4,
    icon: "ri-mail-line",
    label: "Contacto",
    onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),
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
        <div className="flex flex-col items-center gap-2 order-2 md:order-none">
          <div className="flex gap-3">
            <a href="https://github.com/HXava25"><i className="ri-github-fill ri-2x"></i></a>
            <a href="https://www.linkedin.com/in/henry-hans-"><i className="ri-linkedin-fill ri-2x"></i></a>
          </div>
          <p className="text-sm text-zinc-500">Henry Hans © 2026</p>
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
