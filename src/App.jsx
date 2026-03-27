import { useRef, useState, useEffect } from "react";
import { listTools, listProyek } from "./data.js";
import { supabase } from "./supabase.js";
import ShinyText from "./components/ShinyText/ShinyText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Lanyard from "./components/Lanyard/Lanyard";
import ParticlesBackground from "./components/Particles/Particles";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ChatRoom from "./components/ChatRoom";
import Aurora from "./components/Aurora/Aurora";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message
          }
        ]);
      
      if (error) throw error;
      
      setSubmitMessage('Mensaje enviado exitosamente!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error completo:', error);
      console.error('Mensaje de error:', error.message);
      console.error('Código de error:', error.code);
      setSubmitMessage('Error al enviar el mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#8B5CF6"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              }
            },
            "opacity": {
              "value": 0.3,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 80,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#8B5CF6",
              "opacity": 0.2,
              "width": 1.15
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "repulse"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 0.8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="particles-js" className="fixed top-0 left-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'auto' }}></div>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-2s">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/logo.png" className="w-10 rounded-md" />
              <q>La vida no se trata de ser invencible, se trata de ser imparable</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hola soy Henry Hans Huayta Hinojosa" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="Desarrollador backend, con conocimientos en Python.Dedicado a crear experiencias digitales modernas y de alto rendimiento a través de soluciones innovadoras y fáciles de usar."
              delay={105}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a 
                href="./assets/CV.pdf" 
                download="Henry_Huayta_Hinojosa_CV.pdf" 
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Descargar CV" disabled={false} speed={3} className="custom-class" />
              </a>
              <a href="#project" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Explorar Mis Proyectos" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>
          </div>
          <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-3s">
            <ProfileCard
              name="Henry Hans Huayta Hinojosa"
              title="Desarrollador Backend"
              handle="henryhans"
              status="Online"
              contactText="Contáctame"
              avatarUrl="./assets/logo.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>

        {/* tentang */}
        <div className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6 relative overflow-hidden" id="about">
          <ParticlesBackground />
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8 relative z-10" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30">
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  Sobre Mí
                </h2>
                <BlurText
                  text="Soy Henry Hans Huayta Hinojosa, estudiante de Ingeniería de Sistemas del IX ciclo en la Universidad Nacional del Centro del Perú (UNCP). Me desempeño como desarrollador backend, con sólidos conocimientos en ciberseguridad y automatización mediante Python (scripts). Cuento con experiencia en entornos y herramientas como Parrot OS, Red Hat y Pandora FMS, así como conocimientos en seguridad ofensiva (nivel intermedio – Black Hat), enfocados en el análisis de vulnerabilidades y pruebas de seguridad. Además, poseo conocimientos en Machine Learning y Deep Learning, aplicando conceptos de aprendizaje automático y redes neuronales para el análisis de datos y desarrollo de soluciones inteligentes. Actualmente, me encuentro en constante proceso de aprendizaje, con un fuerte interés en fortalecer mis competencias en seguridad informática e inteligencia artificial"
                  delay={50}
                  animateBy="words"
                  direction="top"
                  className="mb-6"
                />
                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      6<span className="text-violet-500">+</span>
                    </h1>
                    <p>Proyectos Completados</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      1<span className="text-violet-500">+</span>
                    </h1>
                    <p>Año de Experiencia</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="700" data-aos-delay="420" data-aos-once="true">
                    <h1 className="text-3xl md:text-4xl mb-1">
                      3.00<span className="text-violet-500">/4.00</span>
                    </h1>
                    <p>GPA</p>
                  </div>
                </div>
                <ShinyText
                  text="La mente lo es todo. En lo que piensas, te conviertes"
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>

        <div className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">Herramientas y Tecnologías</h1>
          <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="700" data-aos-delay="210" data-aos-once="true">Mis Habilidades Profesionales</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {listTools.map((tool) => (
              <div
                key={tool.id} 
                data-aos="fade-up" 
                data-aos-duration="700" 
                data-aos-delay={tool.dad} 
                data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proyek */}
        <div className="proyek mt-32 py-10 relative overflow-hidden" id="project" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
          <ParticlesBackground />
          <div className="relative z-10">
            <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">Proyectos</h1>
            <p className="text-base/loose text-center opacity-50" data-aos="fade-up" data-aos-duration="700" data-aos-delay="210" data-aos-once="true">Mostrando una selección de proyectos que reflejan mis habilidades, creatividad y pasión por construir experiencias digitales significativas.</p>
            <div className="proyek-box mt-14">
              <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="700" data-aos-delay="280" data-aos-once="true">
                <ChromaGrid
                  items={listProyek}
                  onItemClick={handleProjectClick}
                  radius={500}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0 relative overflow-hidden" id="contact">
          <ParticlesBackground />
          <div className="relative z-10">
            <h1 className="text-4xl mb-2 font-bold text-center" data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
              Contacto & Chat
            </h1>
            <p className="text-base/loose text-center mb-10 opacity-50" data-aos="fade-up" data-aos-duration="700" data-aos-delay="210" data-aos-once="true">
              Ponte en contacto conmigo o chatea en tiempo real
            </p>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-zinc-800 p-6 rounded-md relative overflow-hidden" data-aos="fade-up" data-aos-duration="700" data-aos-delay="280" data-aos-once="true">
                <div className="absolute top-0 left-0 w-full h-full">
                  <Aurora
                    colorStops={["#8B5CF6", "#7C3AED", "#6D28D9", "#A855F7"]}
                    blend={0.5}
                    amplitude={1.5}
                    speed={0.5}
                  />
                </div>
                <div className="relative z-10 flex justify-center items-center h-full min-h-[300px]">
                  <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
                </div>
              </div>
              <div className="flex-1">
                <form
                  onSubmit={handleSubmit}
                  className="bg-zinc-800 p-10 w-full rounded-md"
                  autoComplete="off"
                  data-aos="fade-up"
                  data-aos-duration="700"
                  data-aos-delay="350"
                  data-aos-once="true"
                >
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">Nombre Completo</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Ingresa tu nombre..." 
                        className="border border-zinc-500 p-2 rounded-md" 
                        required 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="Ingresa tu email..." 
                        className="border border-zinc-500 p-2 rounded-md" 
                        required 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-semibold">Mensaje</label>
                      <textarea 
                        name="message" 
                        id="message" 
                        value={formData.message}
                        onChange={handleFormChange}
                        cols="45" 
                        rows="7" 
                        placeholder="Tu mensaje..." 
                        className="border border-zinc-500 p-2 rounded-md" 
                        required
                      ></textarea>
                    </div>
                    {submitMessage && (
                      <div className={`text-center p-2 rounded-md ${submitMessage.includes('exitosamente') ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                        {submitMessage}
                      </div>
                    )}
                    <div className="text-center">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShinyText text={isSubmitting ? "Enviando..." : "Enviar"} disabled={false} speed={3} className="custom-class" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;
