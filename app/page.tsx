"use client"

import { Navbar } from "@/components/navbar"
import { ProjectDetailsPanel } from "@/components/project-modal"
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const [currentOtherLogo, setCurrentOtherLogo] = useState(0);
  const [logoKey, setLogoKey] = useState(0);
  const [activeProject, setActiveProject] = useState(1);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isProjectPanelOpen, setIsProjectPanelOpen] = useState(false);
  const [language, setLanguage] = useState<'pl' | 'en'>('pl');
  const projectsRef = useRef<HTMLDivElement>(null);
  
  const otherLogos = ["/git-logo.png", "/express-logo.webp", "bootstrap-logo.svg", "/docker-logo.png", "/mongodb-logo.svg", "/typescript-logo.png", "/mysql-logo.png", "/python-logo.svg", "/nextjs-logo.png", "/tailwind-logo.svg", "php-logo.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoKey(prev => prev + 1);
      setTimeout(() => {
        setCurrentOtherLogo((prev) => (prev + 1) % otherLogos.length);
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const translations = {
    pl: {
      hero: {
        title: "Hubert Jędruchniewicz",
        subtitle: "Aplikacje webowe i mobilne",
        projectsButton: "Zobacz projekty",
        contactButton: "Kontakt"
      },
      about: {
        title: "O mnie",
        paragraphs: [
          "Jestem pasjonatem tworzenia aplikacji webowych i mobilnych. Specjalizuję się w budowaniu responsywnych interfejsów użytkownika oraz wydajnych aplikacji full-stack.",
          "Moje doświadczenie obejmuje pracę z nowoczesnymi technologiami takimi jak React, Next.js, TypeScript, Kotlin i Swift.",
          "W wolnym czasie eksperymentuję z nowymi technologiami, tworzę proste gry komputerowe lub eksperymentuje w kuchni."
        ]
      },
      skills: [
        {
          name: "React",
          description: "Tworzenie nowoczesnych interfejsów użytkownika z wykorzystaniem komponentów funkcyjnych i hooks.",
        },
        {
          name: "Kotlin",
          description: "Budowanie wydajnych aplikacji na Androida z wykorzystaniem nowoczesnych funkcji języka Kotlin.",
        },
        {
          name: "JavaScript",
          description: "Wszechstronny język programowania do tworzenia dynamicznych aplikacji webowych i interaktywnych stron internetowych.",
        },
        {
          name: "Node.js",
          description: "Tworzenie skalowalnych aplikacji backendowych i API z wykorzystaniem środowiska uruchomieniowego Node.js.",
        },
        {
          name: "Swift",
          description: "Programowanie aplikacji na iOS z wykorzystaniem języka Swift i frameworku SwiftUI.",
        },
        {
          name: "CSS",
          description: "Stylizowanie stron internetowych z wykorzystaniem nowoczesnych frameworków CSS i technik responsywnego designu.",
        },
        {
          name: "HTML",
          description: "Strukturyzowanie treści stron internetowych z wykorzystaniem semantycznego HTML5.",
        },
        {
          name: "Inne",
          description: "TypeScript, Next.js, Tailwind, MongoDB, Git, Docker i wiele innych.",
        }
      ],
      projects: {
        title: "Projekty",
        moreButton: "Więcej",
        githubButton: "Github"
      },
      contact: {
        title: "Kontakt",
        description: "Masz pytania lub chcesz porozmawiać o projekcie? Skontaktuj się ze mną!",
        email: "hubert.jedruchniewicz@interia.pl"
      },
      footer: "© 2025 Hubert Jędruchniewicz. Wszystkie prawa zastrzeżone."
    },
    en: {
      hero: {
        title: "Hubert Jędruchniewicz",
        subtitle: "Web and mobile applications",
        projectsButton: "View projects",
        contactButton: "Contact"
      },
      about: {
        title: "About me",
        paragraphs: [
          "I am passionate about creating web and mobile applications. I specialize in building responsive user interfaces and efficient full-stack applications.",
          "My experience includes working with modern technologies such as React, Next.js, TypeScript, Kotlin, and Swift.",
          "In my free time, I experiment with new technologies, create simple computer games, or experiment in the kitchen."
        ]
      },
      skills: [
        {
          name: "React",
          description: "Creating modern user interfaces using functional components and hooks.",
        },
        {
          name: "Kotlin",
          description: "Building efficient Android applications using modern Kotlin language features.",
        },
        {
          name: "JavaScript",
          description: "Versatile programming language for creating dynamic web applications and interactive websites.",
        },
        {
          name: "Node.js",
          description: "Building scalable backend applications and APIs using the Node.js runtime environment.",
        },
        {
          name: "Swift",
          description: "Programming iOS applications using Swift language and SwiftUI framework.",
        },
        {
          name: "CSS",
          description: "Styling websites using modern CSS frameworks and responsive design techniques.",
        },
        {
          name: "HTML",
          description: "Structuring website content using semantic HTML5.",
        },
        {
          name: "Other",
          description: "TypeScript, Next.js, Tailwind, MongoDB, Git, Docker and many more.",
        }
      ],
      projects: {
        title: "Projects",
        moreButton: "More",
        githubButton: "Github"
      },
      contact: {
        title: "Contact",
        description: "Have questions or want to discuss a project? Get in touch with me!",
        email: "hubert.jedruchniewicz@interia.pl"
      },
      footer: "© 2025 Hubert Jędruchniewicz. All rights reserved."
    }
  };

  const t = translations[language];

  const skills = t.skills.map((skill, index) => ({
    ...skill,
    logo: [
      "/react-logo.png",
      "/kotlin-logo.png",
      "/js-logo.svg",
      "/nodejs-logo.webp",
      "/swift-logo.svg",
      "/css-logo.png",
      "/html-logo.png",
      otherLogos[currentOtherLogo]
    ][index],
    background: [
      "/react-bg.png",
      "/kotlin-bg.png",
      "/javascript-bg.png",
      "/nodejs-bg.png",
      "/swift-bg.png",
      "/css-bg.png",
      "/html-bg.png",
      "/other-bg.png"
    ][index],
    hoverBorder: [
      "hover:border-blue-400/60",
      "hover:border-pink-400/60",
      "hover:border-yellow-500/60",
      "hover:border-green-500/60",
      "hover:border-red-400/60",
      "hover:border-blue-400/60",
      "hover:border-orange-500/60",
      "hover:border-gray-600/60"
    ][index]
  }));

  const projects = [
    {
      id: 1,
      title: "Zimori",
      description: language === 'pl' 
        ? "Aplikacja internetowa do symulacji ekosystemów" 
        : "Web application for ecosystem simulations",
      longDescription: language === 'pl'
        ? "Zimori to aplikacja internetowa służąca do symulacji ekosystemów, w której użytkownicy mogą ręcznie dostosowywać właściwości środowiska w celu osiągnięcia równowagi. Każda symulacja odbywa się w czasie rzeczywistym, a użytkownicy mają dostęp do statystyk dotyczących całego ekosystemu i poszczególnych obiektów."
        : "Zimori is a web application for ecosystem simulations where users can manually adjust environment properties to achieve balance. Each simulation runs in real-time, and users have access to statistics for the entire ecosystem and individual objects.",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/projects/zimori-ss.png",
      logo: "/projects/zimori-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Zimori",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss7.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss8.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss9.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss10.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss11.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Zimori/main/ss/ss12.jpg"
      ]
    },
    {
      id: 2,
      title: "Kraina Słodyczy",
      description: language === 'pl' 
        ? "Strona internetowa dla osoby, która piecze ciasta i inne słodkości na zamówienie"
        : "Website for a person who bakes cakes and other sweets to order",
      longDescription: language === 'pl'
        ? "Strona internetowa „Kraina Słodyczy” jest miejscem, którego głównym celem jest zaprezentowanie dotychczasowych wypieków właścicielki, w celu zachęcenia nowych klientów do skorzystania z jej usług. W prosty i przejrzysty sposób przedstawia aktualną ofertę oraz dane kontaktowe."
        : "The „Kraina Słodyczy” website is a place whose main purpose is to showcase the owner's previous baked goods in order to encourage new customers to use her services. It simply and clearly presents the current offer and contact details.It simply and clearly presents the current offer and contact details.",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/projects/krainaslodyczy-ss.png",
      logo: "/projects/krainaslodyczy-logo.png",
      websiteUrl: "https://kraina-slodyczy.pl",
      githubUrl: "https://github.com/hadoyyo/Kraina-Slodyczy-Website",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss7.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss8.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss9.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Kraina-Slodyczy-Website/refs/heads/main/ss/ss10.jpg"

      ]
    },
    {
      id: 3,
      title: "Applant",
      description: language === 'pl'
        ? "Aplikacja na telefony z systemem Android do kontrolowania częstotliwości podlewania roślin"
        : "An app for Android devices to control the frequency of plant watering and care",
      longDescription: language === 'pl'
        ? "Applant to aplikacja, która pozwala zarządzać i kontrolować czynności wykonywane związane z roślinami doniczkowymi. Jej działanie jest wspierane przez zewnętrzny interfejs API, który umożliwia wdrożenie wielu przydatnych funkcji."
        : "Applant is an application that allows you to manage and control activities related to potted plants. Its operation is supported by an external API that enables the implementation of many useful features.",
      technologies: ["Kotlin"],
      image: "/projects/applant-ss.png",
      logo: "/projects/applant-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Applant",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss1.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss2.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss3.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss4.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss5.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss6.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss7.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss8.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss9.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss10.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss11.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss12.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss13.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Applant/refs/heads/identification-activities/ss/ss14.jpg"
      ]
    },
    {
      id: 4,
      title: "LitePay",
      description: language === 'pl'
        ? "Aplikacja internetowa do śledzenia i dzielenia się wydatkami grupowymi"
        : "Web application for tracking and sharing group expenses",
      longDescription: language === 'pl' 
        ? "LitePay to aplikacja internetowa zbudowana w oparciu o stos MERN (MongoDB, Express, React, Node.js), która ułatwia dzielenie się wydatkami z przyjaciółmi, rodziną lub współlokatorami. Pozwala użytkownikom szybko ustalić, kto jest komu winien i ile po spotkaniu, podróży lub innym wydarzeniu. Dodatkowo zapewnia statystyki związane z zarządzaniem osobistymi finansami."
        : "LitePay is a web application built with the MERN stack (MongoDB, Express, React, Node.js) that makes it easy to split expenses with friends, family, or roommates. It allows users to quickly determine who owes whom and how much after a meeting, trip other event. Additionally, it provides statistics related to personal money management.",
      technologies: ["JavaScript", "React", "Express.js", "Node.js", "MongoDB"],
      image: "/projects/litepay-ss.png",
      logo: "/projects/litepay-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/LitePay-WebApp",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss7.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss8.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss9.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss10.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss11.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss12.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss13.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss14.png",
        "https://raw.githubusercontent.com/hadoyyo/LitePay-WebApp/refs/heads/main/ss/ss15.png"
      ]
    },
    {
      id: 5,
      title: "Pasieka Korona",
      description: language === 'pl'
        ? "Strona stworzona w celu promowania firmy zajmującej się sprzedażą miodu i innych produktów pszczelich"
        : "Website created to promote a business selling honey and other bee products",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla właściciela pasieki w celu bezpośredniej sprzedaży miodu i innych produktów pszczelich. Sklep został wykonany samodzielnie, bez pomocy oprogramowania takiego jak Shopify czy WooCommerce."
        : "The website was created for a beekeeper to directly sell honey and other bee products. The store was built independently, without the help of software such as Shopify or WooCommerce.",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/projects/pasieka-ss.png",
      logo: "/projects/pasieka-logo.png",
      websiteUrl: "https://pasiekakorona.pl",
      githubUrl: "https://github.com/hadoyyo/LitePay-WebApp",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss7.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss8.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss9.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss10.jpg"
      ]
    },
    {
      id: 6,
      title: "Serwolift",
      description: language === 'pl'
        ? "Strona dla firmy zajmującej się serwisowaniem urządzeń transportu bliskiego"
        : "Website for a company specializing in servicing material handling equipment",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy Serwolift, która specjalizuje się w serwisowaniu urządzeń transportu bliskiego, takich jak podnośniki, wózki widłowe i suwnice. Strona ma na celu przedstawienie oferty firmy oraz umożliwienie klientom łatwego kontaktu."
        : "The website was created for Serwolift, a company specializing in servicing material handling equipment such as lifts, forklifts, and cranes. The site aims to present the company's offerings and facilitate easy contact for clients.",
        technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/projects/serwolift-ss.png",
      logo: "/projects/serwolift-logo.png",
      websiteUrl: "https://serwolift.pl",
      githubUrl: "https://github.com/hadoyyo/Serwo-Website",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss5.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Serwo-Website/refs/heads/main/ss/ss6.jpg"
      ]
    },
    {
      id: 7,
      title: "Energostat",
      description: language === 'pl'
        ? "Prosta usługa dostarczająca informacji na temat zużycia energii w różnych krajach"
        :  "A simple service providing information about energy consumption in various countries",
      longDescription: language === 'pl'
        ? "Energostat to aplikacja internetowa, która dostarcza użytkownikom informacji na temat zużycia energii w różnych krajach. Dane są pobierane z zewnętrznego API i prezentowane w czytelny sposób za pomocą wykresów i tabel."
        : "Energostat is a web application that provides users with information about energy consumption in various countries. The data is fetched from an external API and presented in a clear manner using charts and tables.",
      technologies: ["JavaScript", "React", "Express.js", "Node.js", "MySQL", "Docker"],
      image: "/projects/energostat-ss.png",
      logo: "/projects/energostat-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Energostat",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss7.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss8.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss9.png",
        "https://raw.githubusercontent.com/hadoyyo/Energostat/refs/heads/main/ss/ss10.png"
      ]
    },
    {
      id: 8,
      title: "Habita",
      description: language === 'pl'
        ? "Aplikacja do śledzenia nawyków na platformę iOS"
        : "Habit tracking app for iOS platform",
      longDescription: language === 'pl'
        ? "Habita to aplikacja mobilna na platformę iOS, która pomaga użytkownikom śledzić i zarządzać swoimi nawykami. Umożliwia dodawanie różnych typów nawyków oraz monitorowanie postępów za pomocą wykresów i statystyk."
        : "Habita is a mobile application for the iOS platform that helps users track and manage their habits. It allows adding different types of habits and monitoring progress through charts and statistics.",
      technologies: ["Swift"],
      image: "/projects/habita-ss.png",
      logo: "/projects/habita-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Habita",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss1.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss2.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss3.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss4.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss5.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss7.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss8.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Habita/refs/heads/main/ss/ss9.PNG"
      ]
    },
    {
      id: 9,
      title: "Pepper's",
      description: language === 'pl'
        ? "Aplikacja internetowa do zarządzania rezerwacjami w salonie fryzjerskim"
        : "Web application to manage bookings at a barbershop, designed for customers, barbers and admin.",
      longDescription: language === 'pl'
        ? "Pepper's to aplikacja internetowa stworzona dla salonu fryzjerskiego, umożliwiająca klientom rezerwację wizyt online. Aplikacja pozwala na przeglądanie dostępnych terminów oraz zarządzanie rezerwacjami przez personel salonu. Dostępny jest również panel administracyjny do zarządzania usługami, wizytami i pracownikami."
        : "Pepper's is a web application created for a barbershop, allowing customers to book appointments online. The application enables browsing available time slots and managing bookings by the salon staff. An admin panel is also available for managing services, appointments, and employees.",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Bootstrap"],
      image: "/projects/peppers-ss.png",
      logo: "/projects/peppers-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Peppers-Barbershop-WebApp",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss7.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss8.png",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss9.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Peppers-Barbershop-WebApp/refs/heads/main/ss/ss10.jpg"
      ]
    },
    {
      id: 10,
      title: "McGranit",
      description: language === 'pl'
        ? "Strona internetowa firmy zajmującej się kamieniarstwem"
        : "Website for a company specializing in stonemasonry",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy McGranit, która specjalizuje się w kamieniarstwie. Strona ma na celu przedstawienie oferty firmy oraz przedstawienie realizacji wykonanych projektów."
        : "The website was created for McGranit, a company specializing in stonemasonry. The site aims to present the company's offerings and showcase completed projects.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/projects/mcgranit-ss.png",
      logo: "/projects/mcgranit-logo.png",
      websiteUrl: "https://mcgranit.com.pl",
      githubUrl: "https://github.com/hadoyyo/McGranit-Website",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss7.jpg",
        "https://raw.githubusercontent.com/hadoyyo/McGranit-Website/refs/heads/main/ss/ss8.jpg"
      ]
    },
    {
      id: 11,
      title: "SuperLift24",
      description: language === 'pl'
        ? "Strona internetowa dla firmy wynajmującej podnośniki, wózki widłowe i dźwigi"
        : "Website for a company renting lifts, forklifts and cranes",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy SuperLift, która specjalizuje się w wynajmie podnośników, wózków widłowych i ładowarek teleskopowych. Głównym celem strony jest przedstawienie danych technicznych oferowanego sprzętu."
        : "The website was created for SuperLift, a company specializing in the rental of lifts, forklifts and telescopic loaders. The main purpose of the site is to present the technical data of the offered equipment.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/projects/superlift24-ss.png",
      logo: "/projects/superlift24-logo.png",
      websiteUrl: "https://superlift24.pl",
      githubUrl: "https://github.com/hadoyyo/SuperLift24-Portfolio-Website",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss5.jpg",
        "https://raw.githubusercontent.com/hadoyyo/SuperLift24-Portfolio-Website/refs/heads/main/ss/ss6.jpg",
      ]
    },
    {
      id: 12,
      title: "Brakeless",
      description: language === 'pl'
        ? "Gra zręcznościowa na platformę iOS"
        : "An arcade game for the iOS platform",
      longDescription: language === 'pl'
        ? "Brakeless to gra zręcznościowa na platformę iOS, w której gracz steruje samochodem, unikając przeszkód napotkanych na drodze i zbierając monety i ulepszenia. Gra oferuje proste, ale wciągające mechaniki rozgrywki oraz prostą oprawę graficzną."
        : "Brakeless is an arcade game for the iOS platform where the player controls a car, avoiding obstacles encountered on the road and collecting coins and power-ups. The game offers simple yet engaging gameplay mechanics and simple graphics.",
        technologies: ["Swift"],
      image: "/projects/brakeless-ss.png",
      logo: "/projects/brakeless-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Brakeless",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss1.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss2.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss3.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss4.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss5.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss6.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss7.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss8.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss9.PNG",
        "https://raw.githubusercontent.com/hadoyyo/Brakeless/refs/heads/main/ss/ss10.PNG"
      ]
    },

    {
      id: 13,
      title: "Koodly",
      description: language === 'pl'
        ? "Aplikacja internetowa, która sugeruje najbardziej pasujące przepisy na podstawie wybranych składników"
        : "Web application that suggests the most suitable recipes based on selected ingredients",
      longDescription: language === 'pl'
        ? "Koodly to aplikacja internetowa, która pomaga użytkownikom znaleźć przepisy kulinarne na podstawie składników, które mają pod ręką. Użytkownicy mogą wprowadzić składniki, a aplikacja zasugeruje przepisy, które można z nich przygotować."
        : "Koodly is a web application that helps users find culinary recipes based on the ingredients they have on hand. Users can input ingredients, and the application will suggest recipes that can be prepared from them.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/projects/koodly-ss.png",
      logo: "/projects/koodly-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/Koodly-WebApp",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss5.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Koodly-WebApp/refs/heads/main/ss/ss6.jpg"
      ]
    }
  ];

   const handleProjectDetails = (project: any) => {
    setSelectedProject(project);
    setIsProjectPanelOpen(true);
  };

  const handleCloseProjectPanel = () => {
    setIsProjectPanelOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleLanguageChange = (lang: 'pl' | 'en') => {
    setLanguage(lang);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!projectsRef.current) return;

      const scrollPosition = window.scrollY;
      const projectsSection = projectsRef.current;
      const sectionTop = projectsSection.offsetTop - 400; // offest
      const sectionHeight = projectsSection.offsetHeight;

      const scrollProgress = (scrollPosition - sectionTop) / sectionHeight;
      
      const acceleratedProgress = Math.pow(scrollProgress, 1);
      const projectIndex = Math.floor(acceleratedProgress * projects.length);

      if (projectIndex >= 0 && projectIndex < projects.length) {
        setActiveProject(projectIndex + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
       <Navbar onLanguageChange={handleLanguageChange} currentLanguage={language} />

      {/* Project Details Panel */}
      <ProjectDetailsPanel
        project={selectedProject}
        isOpen={isProjectPanelOpen}
        onClose={handleCloseProjectPanel}
        language={language}
      />

       <section 
        id="start" 
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 relative"
      >
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/background-mobile.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/background-main.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="relative rounded-full p-1 bg-gradient-to-r from-blue-800 to-green-700 animate-gradient-x">
                <img
                  src="/profile.jpg"
                  alt="Hubert Jędruchniewicz"
                  className="w-22 h-22 sm:w-26 sm:h-26 rounded-full object-cover shadow-lg border-background"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">{t.hero.title}</h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 text-balance">
            {t.hero.subtitle}
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-full cursor-pointer"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.projectsButton}
            </Button>
            <Button
              size="lg"
              className="rounded-full gray-btn cursor-pointer"
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t.hero.contactButton}
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 dot-pattern"
        style={{ backgroundColor: "#18191B" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">{t.about.title}</h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            {t.about.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className={`relative rounded-lg p-6 min-h-[180px] group border-1 hover:-translate-y-2 hover:border-1 transition-all duration-300 overflow-hidden shadow-sm ${skill.hoverBorder}`}
                style={{
                  backgroundImage: `url(${skill.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div 
                  className="absolute top-0 left-0 w-60 h-60"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.01) 70%, transparent 80%)'
                  }}
                >
                  <div className="relative w-full h-full flex items-start justify-start pl-4 pt-4">
                    {skill.name === "Inne" || skill.name === "Other" ? (
                      <img
                        key={logoKey}
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-10 h-10 object-contain animate-backdrop-slide"
                      />
                    ) : (
                      <img
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                  </div>
                </div>
                
                <div className="text-right mb-4 relative z-20">
                  <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                </div>
                
                <p className="text-white text-sm leading-relaxed mt-8 relative z-20">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section 
        id="projects" 
        ref={projectsRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 relative"
      >
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10"></div>
        
        <div className="max-w-7xl mx-auto w-full relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12">{t.projects.title}</h2>
          
          <div className="hidden lg:flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2 space-y-8">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="min-h-[70vh] flex flex-col justify-center py-8"
                >
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-background/50 flex items-center justify-center">
                        <img
                          src={project.logo}
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-1">{project.title}</h3>
                      <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {project.technologies.map((tech) => {
                          const getTechLogo = (techName: string) => {
                            const logoMap: { [key: string]: string } = {
                              "React": "/react-logo.png",
                              "Next.js": "/nextjs-logo.png",
                              "TypeScript": "/typescript-logo.png",
                              "Node.js": "/nodejs-logo.webp",
                              "MongoDB": "/mongodb-logo.svg",
                              "Express.js": "/express-logo.webp",
                              "PostgreSQL": "/postgresql-logo.png",
                              "MySQL": "/mysql-logo.png",
                              "Docker": "/docker-logo.png",
                              "Tailwind": "/tailwind-logo.svg",
                              "Kotlin": "/kotlin-logo.png",
                              "Swift": "/swift-logo.svg",
                              "JavaScript": "/js-logo.svg",
                              "Python": "/python-logo.svg",
                              "PHP": "/php-logo.png",
                              "HTML": "/html-logo.png",
                              "CSS": "/css-logo.png",
                              "Bootstrap": "bootstrap-logo.svg",
                            };
                            return logoMap[techName] || "/other-bg.png";
                          };

                          return (
                            <span 
                              key={tech}
                              className="text-xs px-4 py-2 bg-accent/20 rounded-full border border-border flex items-center gap-2"
                            >
                              <img
                                src={getTechLogo(tech)}
                                alt={`${tech} logo`}
                                className="w-4 h-4 object-contain"
                              />
                              {tech}
                            </span>
                          );
                        })}
                      </div>
                      <div className="pt-6">
                        <Button
                          size="lg"
                          className="rounded-lg cursor-pointer mr-4"
                          variant="default"
                          onClick={() => handleProjectDetails(project)}
                        >
                          {t.projects.moreButton} <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                        <Button
                          size="lg"
                          className="rounded-lg gray-btn cursor-pointer"
                          variant="outline"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {t.projects.githubButton}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/2 sticky top-1/4 h-[500px]">
              <div className="relative w-full h-full rounded-xl overflow-visible">
                {projects.map((project) => (
                  <img
                    key={project.id}
                    src={project.image}
                    alt={project.title}
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                      project.id === activeProject ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {projects.map((project) => {
              const mobileImage = project.image.replace('.png', '-mobile.png').replace('.webp', '-mobile.webp');
              
              return (
                <div
                  key={project.id}
                  className="overflow-hidden"
                >
                  <div className="h-64 sm:h-80 w-full">
                    <img
                      src={mobileImage}
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-6 border border-border rounded-xl">
                    <div className="flex gap-4 items-start mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-lg bg-background/50 flex items-center justify-center">
                          <img
                            src={project.logo}
                            alt={`${project.title} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-6">
                      {project.technologies.map((tech) => {
                        const getTechLogo = (techName: string) => {
                          const logoMap: { [key: string]: string } = {
                            "React": "/react-logo.png",
                            "Next.js": "/nextjs-logo.png",
                            "TypeScript": "/typescript-logo.png",
                            "Node.js": "/nodejs-logo.webp",
                            "MongoDB": "/mongodb-logo.svg",
                            "Express.js": "/express-logo.webp",
                            "PostgreSQL": "/postgresql-logo.png",
                            "MySQL": "/mysql-logo.png",
                            "Docker": "/docker-logo.png",
                            "Tailwind": "/tailwind-logo.svg",
                            "Kotlin": "/kotlin-logo.png",
                            "Swift": "/swift-logo.svg",
                            "JavaScript": "/js-logo.svg",
                            "Python": "/python-logo.svg",
                            "PHP": "/php-logo.png",
                            "HTML": "/html-logo.png",
                            "CSS": "/css-logo.png",
                            "Bootstrap": "bootstrap-logo.svg",
                          };
                          return logoMap[techName] || "/other-bg.png";
                        };

                        return (
                          <span 
                            key={tech}
                            className="text-xs px-3 py-1 bg-accent/20 rounded-full border border-border flex items-center gap-2"
                          >
                            <img
                              src={getTechLogo(tech)}
                              alt={`${tech} logo`}
                              className="w-4 h-4 object-contain"
                            />
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex flex-col flex-row gap-3">
                      <Button
                        size="lg"
                        className="rounded-lg cursor-pointer flex-1"
                        variant="default"
                        onClick={() => handleProjectDetails(project)}
                      >
                        {t.projects.moreButton} <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        size="lg"
                        className="rounded-lg gray-btn cursor-pointer flex-1"
                        variant="outline"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {t.projects.githubButton}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 dot-pattern relative"
      >
        <div className="absolute top-0 left-0 right-0 h-90 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10"></div>
        
        <div 
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: 'url(/background-contact-mobile.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        <div 
          className="absolute inset-0 hidden sm:block"
          style={{
            backgroundImage: 'url(/background-contact.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: "#18191B"
          }}
        ></div>
        
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">{t.contact.title}</h2>
          <p className="text-xl text-muted-foreground mb-12 text-balance">
            {t.contact.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <a
              href="mailto:hubert.jedruchniewicz@interia.pl"
              className="flex items-center gap-3 px-6 py-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>{t.contact.email}</span>
            </a>
          </div>

          <div className="flex gap-6 justify-center">
            <a
              href="https://github.com/hadoyyo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/hubert-j%C4%99druchniewicz-711166267/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-background/50 backdrop-blur-sm border border-border rounded-lg hover:border-accent transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>{t.footer}</p>
      </footer>
    </div>
  )
}