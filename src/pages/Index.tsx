import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/71f6f665-5954-4ab0-85b1-0cd1163edfb7/files/c707d305-ebb3-4d27-8be3-889279ee6e33.jpg";
const FOOD_IMG = "https://cdn.poehali.dev/projects/71f6f665-5954-4ab0-85b1-0cd1163edfb7/files/76101fa7-5ece-446e-9a6b-a31604dfcd8f.jpg";
const MUSIC_IMG = "https://cdn.poehali.dev/projects/71f6f665-5954-4ab0-85b1-0cd1163edfb7/files/4be3cc75-f93c-42ce-89e4-2c621f7b2b9a.jpg";

const NAV_LINKS = [
  { id: "about", label: "О нас" },
  { id: "menu", label: "Меню" },
  { id: "gallery", label: "Галерея" },
  { id: "events", label: "Вечера" },
  { id: "contacts", label: "Контакты" },
];

const MENU_CATEGORIES = [
  {
    title: "Закуски",
    items: [
      { name: "Карпаччо из говядины", desc: "с трюфельным маслом и пармезаном", price: "680 ₽" },
      { name: "Тартар из лосося", desc: "с авокадо и икрой лосося", price: "790 ₽" },
      { name: "Фуа-гра на бриоши", desc: "с конфитюром из инжира", price: "950 ₽" },
    ],
  },
  {
    title: "Основные блюда",
    items: [
      { name: "Утиная грудка", desc: "с соусом из красного вина и пюре из корневого сельдерея", price: "1 290 ₽" },
      { name: "Рибай на кости", desc: "300г, соус беарнез, картофель конфи", price: "2 100 ₽" },
      { name: "Дорадо целиком", desc: "запечённая с лимоном, каперсами и оливками", price: "1 450 ₽" },
    ],
  },
  {
    title: "Десерты",
    items: [
      { name: "Крем-брюле", desc: "с ванилью Бурбон и свежими ягодами", price: "480 ₽" },
      { name: "Шоколадный фондан", desc: "с мороженым из морской соли", price: "520 ₽" },
      { name: "Тарт татен", desc: "с карамелизованными яблоками и кальвадосом", price: "450 ₽" },
    ],
  },
  {
    title: "Напитки",
    items: [
      { name: "Авторские коктейли", desc: "сезонное меню от нашего бармена", price: "от 490 ₽" },
      { name: "Вино по бокалам", desc: "коллекция из 40 наименований", price: "от 350 ₽" },
      { name: "Кофе и чай", desc: "специально обжаренные сорта", price: "от 180 ₽" },
    ],
  },
];

const GALLERY_IMAGES = [
  { src: HERO_IMG, alt: "Интерьер кафе «Эврика»" },
  { src: FOOD_IMG, alt: "Авторская кухня" },
  { src: MUSIC_IMG, alt: "Живая музыка" },
  { src: HERO_IMG, alt: "Вечер в «Эврике»" },
  { src: FOOD_IMG, alt: "Изысканные блюда" },
  { src: MUSIC_IMG, alt: "Музыкальные вечера" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const about = useInView();
  const menu = useInView();
  const gallery = useInView();
  const events = useInView();
  const contacts = useInView();

  return (
    <div className="font-montserrat bg-ebony-950 text-ebony-100 overflow-x-hidden">
      <style>{`
        :root {
          --gold: #d4a017;
          --gold-light: #e8c04a;
          --ebony-dark: #0a0806;
          --ebony: #130f0b;
          --cream: #f9efcf;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease, transform 0.9s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-up-delay-1 { transition-delay: 0.15s; }
        .fade-up-delay-2 { transition-delay: 0.3s; }
        .fade-up-delay-3 { transition-delay: 0.45s; }
        .gold-line::after {
          content: '';
          display: block;
          width: 60px;
          height: 1px;
          background: var(--gold);
          margin: 16px auto 0;
        }
        .gold-line-left::after {
          margin-left: 0;
        }
        .nav-link {
          position: relative;
          color: #e8e5db;
          letter-spacing: 0.1em;
          font-size: 0.7rem;
          text-transform: uppercase;
          transition: color 0.3s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--gold-light); }
        .nav-link:hover::after { width: 100%; }
        .menu-tab {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 20px;
          border: 1px solid transparent;
          transition: all 0.3s;
          cursor: pointer;
          color: #aba487;
          background: none;
        }
        .menu-tab.active {
          border-color: var(--gold);
          color: var(--gold-light);
        }
        .menu-tab:hover:not(.active) {
          color: #e8e5db;
          border-color: rgba(212,160,23,0.3);
        }
        .gallery-item {
          overflow: hidden;
        }
        .gallery-item img {
          transition: transform 0.7s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.07);
        }
        .btn-gold {
          background: transparent;
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 36px;
          transition: all 0.35s ease;
          cursor: pointer;
          display: inline-block;
        }
        .btn-gold:hover {
          background: var(--gold);
          color: #0a0806;
        }
        .btn-gold-solid {
          background: var(--gold);
          border: 1px solid var(--gold);
          color: #0a0806;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 14px 36px;
          transition: all 0.35s ease;
          cursor: pointer;
          display: inline-block;
          font-weight: 600;
        }
        .btn-gold-solid:hover {
          background: var(--gold-light);
          border-color: var(--gold-light);
        }
        .divider-ornament {
          display: flex;
          align-items: center;
          gap: 16px;
          justify-content: center;
          margin: 24px 0;
        }
        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,160,23,0.4));
        }
        .divider-ornament::after {
          background: linear-gradient(to left, transparent, rgba(212,160,23,0.4));
        }
        .input-elegant {
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(212,160,23,0.35);
          color: #e8e5db;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.85rem;
          padding: 10px 0;
          width: 100%;
          outline: none;
          transition: border-color 0.3s;
        }
        .input-elegant::placeholder { color: #6e6448; }
        .input-elegant:focus { border-bottom-color: var(--gold); }
        .hero-text-shadow { text-shadow: 0 2px 40px rgba(0,0,0,0.8); }
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: hero-fade 1.2s ease forwards; }
        .hero-animate-delay { animation: hero-fade 1.2s ease 0.4s forwards; opacity: 0; }
        .hero-animate-delay-2 { animation: hero-fade 1.2s ease 0.8s forwards; opacity: 0; }
        .hero-animate-delay-3 { animation: hero-fade 1.2s ease 1.2s forwards; opacity: 0; }
        select.input-elegant option { background: #130f0b; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-ebony-950/95 backdrop-blur-sm border-b border-gold-800/30 py-4" : "py-6"}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="font-cormorant text-2xl font-light tracking-widest text-gold-300 hover:text-gold-200 transition-colors" style={{ background: "none", border: "none", cursor: "pointer" }}>
            ЭВРИКА
          </button>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link">{l.label}</button>
            ))}
          </div>
          <button onClick={() => scrollTo("booking")} className="hidden md:block btn-gold text-xs">
            Забронировать
          </button>
          <button className="md:hidden text-gold-300" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-ebony-950/98 border-t border-gold-800/20 px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => { scrollTo(l.id); setMenuOpen(false); }} className="nav-link text-left">{l.label}</button>
            ))}
            <button onClick={() => { scrollTo("booking"); setMenuOpen(false); }} className="btn-gold-solid w-full mt-2">Забронировать</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Кафе Эврика" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,8,6,0.7), rgba(10,8,6,0.5), rgba(10,8,6,0.9))" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,8,6,0.6), transparent, rgba(10,8,6,0.6))" }} />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="hero-animate font-montserrat text-gold-400 tracking-[0.3em] text-xs uppercase mb-6">Добро пожаловать в</p>
          <h1 className="hero-animate-delay font-cormorant text-7xl md:text-9xl font-light text-white hero-text-shadow leading-none mb-4">
            Эврика
          </h1>
          <div className="hero-animate-delay divider-ornament">
            <span className="text-gold-500 text-lg">✦</span>
          </div>
          <p className="hero-animate-delay-2 font-cormorant italic text-xl md:text-2xl text-ebony-200 hero-text-shadow mb-10 font-light">
            Живая музыка · Изысканная кухня · Незабываемые вечера
          </p>
          <div className="hero-animate-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => scrollTo("menu")} className="btn-gold">Смотреть меню</button>
            <button onClick={() => scrollTo("booking")} className="btn-gold-solid">Забронировать стол</button>
          </div>
        </div>
        <button onClick={() => scrollTo("about")} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-500 animate-bounce" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6">
        <div ref={about.ref} className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className={`fade-up ${about.inView ? "visible" : ""}`}>
            <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">О нас</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white leading-tight mb-6 gold-line gold-line-left">
              Место, где рождается<br /><em>открытие</em>
            </h2>
            <p className="text-ebony-300 leading-relaxed mb-5 font-light text-sm">
              Кафе «Эврика» — это не просто ресторан. Это пространство для открытий: новых вкусов, знакомств и эмоций. Каждый вечер здесь оживает живая музыка, а наш шеф-повар создаёт блюда, которые удивляют.
            </p>
            <p className="text-ebony-300 leading-relaxed mb-8 font-light text-sm">
              Мы верим, что настоящий отдых — это гармония вкуса, звука и атмосферы. Именно поэтому каждая деталь интерьера, каждый аккорд и каждое блюдо подобраны с любовью и вниманием.
            </p>
            <div className="flex gap-12">
              <div>
                <p className="font-cormorant text-4xl text-gold-400 font-light">7+</p>
                <p className="font-montserrat text-xs text-ebony-400 tracking-widest uppercase mt-1">лет истории</p>
              </div>
              <div>
                <p className="font-cormorant text-4xl text-gold-400 font-light">5×</p>
                <p className="font-montserrat text-xs text-ebony-400 tracking-widest uppercase mt-1">в неделю музыка</p>
              </div>
              <div>
                <p className="font-cormorant text-4xl text-gold-400 font-light">80+</p>
                <p className="font-montserrat text-xs text-ebony-400 tracking-widest uppercase mt-1">позиций в меню</p>
              </div>
            </div>
          </div>
          <div className={`fade-up fade-up-delay-2 ${about.inView ? "visible" : ""} relative`}>
            <img src={MUSIC_IMG} alt="Живая музыка" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-5 -left-5 w-32 h-32 border border-gold-700/40" />
            <div className="absolute -top-5 -right-5 w-32 h-32 border border-gold-700/40" />
            <div className="absolute bottom-6 right-6 px-5 py-4" style={{ background: "rgba(10,8,6,0.9)", border: "1px solid rgba(116,88,7,0.3)" }}>
              <p className="font-cormorant italic text-gold-300 text-lg">"Каждый вечер — особенный"</p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="py-28 px-6 bg-ebony-900/50">
        <div ref={menu.ref} className="max-w-5xl mx-auto">
          <div className={`fade-up ${menu.inView ? "visible" : ""} text-center mb-14`}>
            <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">Наше предложение</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white gold-line">Меню</h2>
          </div>
          <div className={`fade-up fade-up-delay-1 ${menu.inView ? "visible" : ""} flex flex-wrap justify-center gap-2 mb-12`}>
            {MENU_CATEGORIES.map((cat, i) => (
              <button key={i} onClick={() => setActiveCategory(i)} className={`menu-tab ${activeCategory === i ? "active" : ""}`}>
                {cat.title}
              </button>
            ))}
          </div>
          <div className={`fade-up fade-up-delay-2 ${menu.inView ? "visible" : ""}`}>
            {MENU_CATEGORIES[activeCategory].items.map((item, i) => (
              <div key={i} className="flex items-start justify-between py-6 group" style={{ borderBottom: "1px solid rgba(37,34,24,0.6)" }}>
                <div className="flex-1 mr-8">
                  <h3 className="font-cormorant text-xl text-white group-hover:text-gold-300 transition-colors">{item.name}</h3>
                  <p className="font-montserrat text-ebony-400 text-xs mt-1 font-light">{item.desc}</p>
                </div>
                <span className="font-cormorant text-gold-400 text-xl whitespace-nowrap">{item.price}</span>
              </div>
            ))}
          </div>
          <div className={`fade-up fade-up-delay-3 ${menu.inView ? "visible" : ""} text-center mt-12`}>
            <p className="font-cormorant italic text-ebony-400 text-sm mb-5">Полное меню доступно в заведении или по запросу</p>
            <button onClick={() => scrollTo("contacts")} className="btn-gold">Запросить полное меню</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 px-6">
        <div ref={gallery.ref} className="max-w-6xl mx-auto">
          <div className={`fade-up ${gallery.inView ? "visible" : ""} text-center mb-14`}>
            <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">Атмосфера</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white gold-line">Галерея</h2>
          </div>
          <div className={`fade-up fade-up-delay-1 ${gallery.inView ? "visible" : ""} grid grid-cols-2 md:grid-cols-3 gap-3`}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className={`gallery-item ${i === 0 ? "row-span-2" : ""}`}>
                <img src={img.src} alt={img.alt} className={`w-full object-cover ${i === 0 ? "h-full min-h-[300px]" : "aspect-square"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-28 px-6 relative overflow-hidden" style={{ background: "rgba(19,15,11,0.5)" }}>
        <div className="absolute inset-0">
          <img src={MUSIC_IMG} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #0a0806, rgba(10,8,6,0.8), #0a0806)" }} />
        </div>
        <div ref={events.ref} className="relative z-10 max-w-5xl mx-auto">
          <div className={`fade-up ${events.inView ? "visible" : ""} text-center mb-16`}>
            <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">Каждый вечер особенный</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white gold-line">Живая музыка</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { day: "Ср — Чт", title: "Джаз & Соул", desc: "Камерные выступления под бокал авторского коктейля. Атмосфера уюта и лёгкого джаза.", icon: "Music" },
              { day: "Пт — Сб", title: "Живой концерт", desc: "Приглашённые музыканты, горячая программа и танцы до полуночи. Лучший вечер недели.", icon: "Star" },
              { day: "Воскресенье", title: "Acoustic Sunday", desc: "Акустические вечера с авторской музыкой. Мягкие ритмы и вкусный бранч.", icon: "Mic" },
            ].map((ev, i) => (
              <div key={i} className={`fade-up fade-up-delay-${i + 1} ${events.inView ? "visible" : ""} p-8 group transition-colors`} style={{ border: "1px solid rgba(116,88,7,0.3)" }}>
                <p className="font-montserrat text-gold-500 text-xs tracking-widest uppercase mb-3">{ev.day}</p>
                <div className="flex items-center gap-3 mb-4">
                  <Icon name={ev.icon} size={18} className="text-gold-400" />
                  <h3 className="font-cormorant text-2xl text-white group-hover:text-gold-300 transition-colors">{ev.title}</h3>
                </div>
                <p className="font-montserrat text-ebony-400 text-xs leading-relaxed font-light">{ev.desc}</p>
              </div>
            ))}
          </div>
          <div className={`fade-up fade-up-delay-3 ${events.inView ? "visible" : ""} text-center mt-14`}>
            <button onClick={() => scrollTo("booking")} className="btn-gold-solid">Забронировать на вечер</button>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-28 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">Мы ждём вас</p>
          <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white gold-line mb-14">Бронирование</h2>
          <form className="text-left space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Имя</label>
                <input type="text" placeholder="Ваше имя" className="input-elegant" />
              </div>
              <div>
                <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className="input-elegant" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Дата</label>
                <input type="date" className="input-elegant" />
              </div>
              <div>
                <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Время</label>
                <select className="input-elegant">
                  <option value="">Выбрать</option>
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                  <option>21:00</option>
                </select>
              </div>
              <div>
                <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Гостей</label>
                <select className="input-elegant">
                  <option>1–2 гостя</option>
                  <option>3–4 гостя</option>
                  <option>5–6 гостей</option>
                  <option>7+ гостей</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-montserrat text-xs text-gold-600 tracking-widest uppercase block mb-2">Пожелания</label>
              <textarea rows={3} placeholder="Особые пожелания, повод для визита..." className="input-elegant resize-none" />
            </div>
            <div className="text-center pt-4">
              <button type="submit" className="btn-gold-solid px-16">Отправить запрос</button>
            </div>
          </form>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6" style={{ borderTop: "1px solid rgba(37,34,24,0.4)" }}>
        <div ref={contacts.ref} className="max-w-6xl mx-auto">
          <div className={`fade-up ${contacts.inView ? "visible" : ""} text-center mb-14`}>
            <p className="font-montserrat text-gold-500 tracking-[0.25em] text-xs uppercase mb-4">Найдите нас</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white gold-line">Контакты</h2>
          </div>
          <div className={`fade-up fade-up-delay-1 ${contacts.inView ? "visible" : ""} grid md:grid-cols-3 gap-12 text-center`}>
            <div>
              <div className="flex justify-center mb-4">
                <Icon name="MapPin" size={20} className="text-gold-500" />
              </div>
              <p className="font-montserrat text-xs text-gold-600 tracking-widest uppercase mb-3">Адрес</p>
              <p className="font-cormorant text-xl text-white">ул. Пушкина, 12</p>
              <p className="font-montserrat text-ebony-400 text-xs mt-1">Центральный район</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Icon name="Clock" size={20} className="text-gold-500" />
              </div>
              <p className="font-montserrat text-xs text-gold-600 tracking-widest uppercase mb-3">Режим работы</p>
              <p className="font-cormorant text-xl text-white">Вт–Пт: 17:00 – 01:00</p>
              <p className="font-cormorant text-xl text-white">Сб–Вс: 14:00 – 02:00</p>
              <p className="font-montserrat text-ebony-400 text-xs mt-1">Пн — выходной</p>
            </div>
            <div>
              <div className="flex justify-center mb-4">
                <Icon name="Phone" size={20} className="text-gold-500" />
              </div>
              <p className="font-montserrat text-xs text-gold-600 tracking-widest uppercase mb-3">Звоните нам</p>
              <p className="font-cormorant text-xl text-white">+7 (999) 123-45-67</p>
              <p className="font-montserrat text-ebony-400 text-xs mt-1">Бронирование и вопросы</p>
            </div>
          </div>
          <div className={`fade-up fade-up-delay-2 ${contacts.inView ? "visible" : ""} flex justify-center gap-6 mt-14`}>
            {[
              { icon: "Instagram", label: "Instagram" },
              { icon: "MessageCircle", label: "Telegram" },
              { icon: "Phone", label: "WhatsApp" },
            ].map(s => (
              <button key={s.label} className="flex items-center gap-2 font-montserrat text-xs text-ebony-400 hover:text-gold-400 tracking-widest uppercase transition-colors" style={{ background: "none", border: "none", cursor: "pointer" }}>
                <Icon name={s.icon} size={16} />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 text-center" style={{ borderTop: "1px solid rgba(37,34,24,0.4)" }}>
        <p className="font-cormorant text-3xl text-gold-600 font-light tracking-widest mb-3">ЭВРИКА</p>
        <div className="divider-ornament max-w-xs mx-auto">
          <span className="text-gold-700 text-sm">✦</span>
        </div>
        <p className="font-montserrat text-ebony-600 text-xs tracking-wider mt-2">
          © 2024 Кафе «Эврика» · Все права защищены
        </p>
      </footer>
    </div>
  );
}