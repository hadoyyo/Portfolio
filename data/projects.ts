export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  logo: string;
  websiteUrl: string | null;
  githubUrl: string;
  galleryImages: string[];
}

export interface ProjectDetailsPanelProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  language: 'pl' | 'en';
}

export const getProjects = (language: 'pl' | 'en'): Project[] => [
  {
    id: 1,
    title: "GitHub Fish Tank",
    description: language === 'pl' 
      ? "Przekształć swoje statystyki języków na GitHubie w akwarium." 
      : "Transform your GitHub language stats into a living fish tank.",
    longDescription: language === 'pl'
      ? "GitHub Fish Tank to aplikacja webowa, która przekształca statystyki języków z Twojego GitHuba w animowane akwarium. Każdy język programowania staje się rybą o unikalnym kształcie i kolorze, pływającą w konfigurowalnej podwodnej scenerii. Narzędzie generuje obraz SVG, który możesz bezpośrednio osadzić w swoim profilu README na GitHubie."
      : "GitHub Fish Tank is a web application that transforms your GitHub language statistics into a living, animated aquarium. Each programming language becomes a uniquely shaped and colored fish swimming through a customizable underwater scene. It generates an SVG image that you can embed directly in your GitHub README profile.",
    technologies: ["JavaScript", "HTML", "CSS", "Node.js", "Express.js"],
    image: "/Portfolio/projects/github-fish-tank-ss.webp",
    logo: "/Portfolio/projects/github-fish-tank-logo.png",
    websiteUrl: null,
    githubUrl: "https://github.com/hadoyyo/GitHub-Fish-Tank",
    galleryImages: [
      "https://raw.githubusercontent.com/hadoyyo/GitHub-Fish-Tank/main/img/ss/ss1.png",
      "https://raw.githubusercontent.com/hadoyyo/GitHub-Fish-Tank/main/img/ss/ss2.png",
      "https://raw.githubusercontent.com/hadoyyo/GitHub-Fish-Tank/main/img/ss/ss3.jpg",
      "https://raw.githubusercontent.com/hadoyyo/GitHub-Fish-Tank/main/img/ss/ss4.jpg",
    ]
  },
  {
      id: 2,
      title: "PetStaytion",
      description: language === 'pl' 
        ? "Mobilna wersja aplikacji zaprojektowanej do łączenia usługodawców z właścicielami zwierząt" 
        : "Mobile version of an app designed to connect service providers with pet owners",
      longDescription: language === 'pl'
        ? "PetStaytion to platforma zaprojektowana w celu łączenia lokalnych dostawców usług dla zwierząt z właścicielami poszukującymi zaufanej opieki i usług dla swoich pupili. Platforma ma na celu uproszczenie procesu oferowania, wyszukiwania i rezerwowania usług związanych ze zwierzętami."
        : "PetStaytion is an advertising platform designed to connect local pet service providers with pet owners seeking trusted care and services for their animals. The platform aims to simplify discovering, offering, and booking pet-related services within local communities.",
      technologies: ["TypeScript", "React Native", "Expo"],
      image: "/Portfolio/projects/petstaytion-ss.webp",
      logo: "/Portfolio/projects/petstaytion-logo.png",
      websiteUrl: null,
      githubUrl: "https://github.com/hadoyyo/PetStaytion-App",
      galleryImages: [
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss1.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss2.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss3.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss4.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss5.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss6.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss7.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss8.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss9.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss10.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss11.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss12.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss13.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss14.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss15.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss16.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss17.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss18.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss19.png",
        "https://raw.githubusercontent.com/hadoyyo/PetStaytion-App/main/ss/ss20.png",
      ]
    },
    {
      id: 3,
      title: "Zimori",
      description: language === 'pl' 
        ? "Aplikacja internetowa do symulacji ekosystemów" 
        : "Web application for ecosystem simulations",
      longDescription: language === 'pl'
        ? "Zimori to aplikacja internetowa służąca do symulacji ekosystemów, w której użytkownicy mogą ręcznie dostosowywać właściwości środowiska w celu osiągnięcia równowagi. Każda symulacja odbywa się w czasie rzeczywistym, a użytkownicy mają dostęp do statystyk dotyczących całego ekosystemu i poszczególnych obiektów."
        : "Zimori is a web application for ecosystem simulations where users can manually adjust environment properties to achieve balance. Each simulation runs in real-time, and users have access to statistics for the entire ecosystem and individual objects.",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/Portfolio/projects/zimori-ss.webp",
      logo: "/Portfolio/projects/zimori-logo.png",
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
      id: 4,
      title: "Kraina Słodyczy",
      description: language === 'pl' 
        ? "Strona internetowa dla osoby, która piecze ciasta i inne słodkości na zamówienie"
        : "Website for a person who bakes cakes and other sweets to order",
      longDescription: language === 'pl'
        ? "Strona internetowa „Kraina Słodyczy” jest miejscem, którego głównym celem jest zaprezentowanie dotychczasowych wypieków właścicielki, w celu zachęcenia nowych klientów do skorzystania z jej usług. W prosty i przejrzysty sposób przedstawia aktualną ofertę oraz dane kontaktowe."
        : "The „Kraina Słodyczy” website is a place whose main purpose is to showcase the owner's previous baked goods in order to encourage new customers to use her services. It simply and clearly presents the current offer and contact details.",
      technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/Portfolio/projects/krainaslodyczy-ss.webp",
      logo: "/Portfolio/projects/krainaslodyczy-logo.webp",
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
      id: 5,
      title: "Applant",
      description: language === 'pl'
        ? "Aplikacja na telefony z systemem Android do kontrolowania częstotliwości podlewania roślin"
        : "An app for Android devices to control the frequency of plant watering and care",
      longDescription: language === 'pl'
        ? "Applant to aplikacja, która pozwala zarządzać i kontrolować czynności wykonywane związane z roślinami doniczkowymi. Jej działanie jest wspierane przez zewnętrzny interfejs API, który umożliwia wdrożenie wielu przydatnych funkcji."
        : "Applant is an application that allows you to manage and control activities related to potted plants. Its operation is supported by an external API that enables the implementation of many useful features.",
      technologies: ["Kotlin"],
      image: "/Portfolio/projects/applant-ss.webp",
      logo: "/Portfolio/projects/applant-logo.webp",
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
      id: 6,
      title: "LitePay",
      description: language === 'pl'
        ? "Aplikacja internetowa do śledzenia i dzielenia się wydatkami grupowymi"
        : "Web application for tracking and sharing group expenses",
      longDescription: language === 'pl' 
        ? "LitePay to aplikacja internetowa zbudowana w oparciu o stos MERN (MongoDB, Express, React, Node.js), która ułatwia dzielenie się wydatkami z przyjaciółmi, rodziną lub współlokatorami. Pozwala użytkownikom szybko ustalić, kto jest komu winien i ile po spotkaniu, podróży lub innym wydarzeniu. Dodatkowo zapewnia statystyki związane z zarządzaniem osobistymi finansami."
        : "LitePay is a web application built with the MERN stack (MongoDB, Express, React, Node.js) that makes it easy to split expenses with friends, family, or roommates. It allows users to quickly determine who owes whom and how much after a meeting, trip other event. Additionally, it provides statistics related to personal money management.",
      technologies: ["JavaScript", "React", "Express.js", "Node.js", "MongoDB"],
      image: "/Portfolio/projects/litepay-ss.webp",
      logo: "/Portfolio/projects/litepay-logo.png",
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
      id: 7,
      title: "Pasieka Korona",
      description: language === 'pl'
        ? "Strona stworzona w celu promowania pasieki sprzedającej miód i inne produkty pszczele"
        : "Website created to promote a business selling honey and other bee products",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla właściciela pasieki w celu bezpośredniej sprzedaży miodu i innych produktów pszczelich. Sklep został wykonany samodzielnie, bez pomocy oprogramowania takiego jak Shopify czy WooCommerce."
        : "The website was created for a beekeeper to directly sell honey and other bee products. The store was built independently, without the help of software such as Shopify or WooCommerce.",
        technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/Portfolio/projects/pasieka-ss.webp",
      logo: "/Portfolio/projects/pasieka-logo.png",
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
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss9.png",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss10.jpg",
        "https://raw.githubusercontent.com/hadoyyo/Pasieka-Korona-Store-Website/refs/heads/main/ss/ss11.jpg"
      ]
    },
    {
      id: 8,
      title: "Serwolift",
      description: language === 'pl'
        ? "Strona dla firmy zajmującej się serwisowaniem urządzeń transportu bliskiego"
        : "Website for a company specializing in servicing material handling equipment",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy Serwolift, która specjalizuje się w serwisowaniu urządzeń transportu bliskiego, takich jak podnośniki, wózki widłowe i suwnice. Strona ma na celu przedstawienie oferty firmy oraz umożliwienie klientom łatwego kontaktu."
        : "The website was created for Serwolift, a company specializing in servicing material handling equipment such as lifts, forklifts, and cranes. The site aims to present the company's offerings and facilitate easy contact for clients.",
        technologies: ["TypeScript", "React", "Next.js", "Tailwind"],
      image: "/Portfolio/projects/serwolift-ss.webp",
      logo: "/Portfolio/projects/serwolift-logo.png",
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
      id: 9,
      title: "Energostat",
      description: language === 'pl'
        ? "Prosta usługa dostarczająca informacji na temat zużycia energii w różnych krajach"
        :  "A simple service providing information about energy consumption in various countries",
      longDescription: language === 'pl'
        ? "Energostat to aplikacja internetowa, która dostarcza użytkownikom informacji na temat zużycia energii w różnych krajach. Dane są pobierane z zewnętrznego API i prezentowane w czytelny sposób za pomocą wykresów i tabel."
        : "Energostat is a web application that provides users with information about energy consumption in various countries. The data is fetched from an external API and presented in a clear manner using charts and tables.",
      technologies: ["JavaScript", "React", "Express.js", "Node.js", "MySQL", "Docker"],
      image: "/Portfolio/projects/energostat-ss.webp",
      logo: "/Portfolio/projects/energostat-logo.webp",
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
      id: 10,
      title: "Habita",
      description: language === 'pl'
        ? "Aplikacja do śledzenia nawyków na platformę iOS"
        : "Habit tracking app for iOS platform",
      longDescription: language === 'pl'
        ? "Habita to aplikacja mobilna na platformę iOS, która pomaga użytkownikom śledzić i zarządzać swoimi nawykami. Umożliwia dodawanie różnych typów nawyków oraz monitorowanie postępów za pomocą wykresów i statystyk."
        : "Habita is a mobile application for the iOS platform that helps users track and manage their habits. It allows adding different types of habits and monitoring progress through charts and statistics.",
      technologies: ["Swift"],
      image: "/Portfolio/projects/habita-ss.webp",
      logo: "/Portfolio/projects/habita-logo.webp",
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
      id: 11,
      title: "Pepper's",
      description: language === 'pl'
        ? "Aplikacja internetowa do zarządzania rezerwacjami w salonie fryzjerskim"
        : "Web application to manage bookings at a barbershop, designed for customers, barbers and admin.",
      longDescription: language === 'pl'
        ? "Pepper's to aplikacja internetowa stworzona dla salonu fryzjerskiego, umożliwiająca klientom rezerwację wizyt online. Aplikacja pozwala na przeglądanie dostępnych terminów oraz zarządzanie rezerwacjami przez personel salonu. Dostępny jest również panel administracyjny do zarządzania usługami, wizytami i pracownikami."
        : "Pepper's is a web application created for a barbershop, allowing customers to book appointments online. The application enables browsing available time slots and managing bookings by the salon staff. An admin panel is also available for managing services, appointments, and employees.",
        technologies: ["PHP", "JavaScript", "MySQL", "HTML", "CSS", "Bootstrap"],
      image: "/Portfolio/projects/peppers-ss.webp",
      logo: "/Portfolio/projects/peppers-logo.webp",
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
      id: 12,
      title: "McGranit",
      description: language === 'pl'
        ? "Strona internetowa firmy zajmującej się kamieniarstwem"
        : "Website for a company specializing in stonemasonry",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy McGranit, która specjalizuje się w kamieniarstwie. Strona ma na celu przedstawienie oferty firmy oraz przedstawienie realizacji wykonanych projektów."
        : "The website was created for McGranit, a company specializing in stonemasonry. The site aims to present the company's offerings and showcase completed projects.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/Portfolio/projects/mcgranit-ss.webp",
      logo: "/Portfolio/projects/mcgranit-logo.webp",
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
      id: 13,
      title: "SuperLift24",
      description: language === 'pl'
        ? "Strona internetowa dla firmy wynajmującej podnośniki, wózki widłowe i dźwigi"
        : "Website for a company renting lifts, forklifts and cranes",
      longDescription: language === 'pl'
        ? "Strona internetowa została stworzona dla firmy SuperLift, która specjalizuje się w wynajmie podnośników, wózków widłowych i ładowarek teleskopowych. Głównym celem strony jest przedstawienie danych technicznych oferowanego sprzętu."
        : "The website was created for SuperLift, a company specializing in the rental of lifts, forklifts and telescopic loaders. The main purpose of the site is to present the technical data of the offered equipment.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/Portfolio/projects/superlift24-ss.webp",
      logo: "/Portfolio/projects/superlift24-logo.png",
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
      id: 14,
      title: "Brakeless",
      description: language === 'pl'
        ? "Gra zręcznościowa na platformę iOS"
        : "An arcade game for the iOS platform",
      longDescription: language === 'pl'
        ? "Brakeless to gra zręcznościowa na platformę iOS, w której gracz steruje samochodem, unikając przeszkód napotkanych na drodze i zbierając monety i ulepszenia. Gra oferuje proste, ale wciągające mechaniki rozgrywki oraz prostą oprawę graficzną."
        : "Brakeless is an arcade game for the iOS platform where the player controls a car, avoiding obstacles encountered on the road and collecting coins and power-ups. The game offers simple yet engaging gameplay mechanics and simple graphics.",
        technologies: ["Swift"],
      image: "/Portfolio/projects/brakeless-ss.webp",
      logo: "/Portfolio/projects/brakeless-logo.png",
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
      id: 15,
      title: "Koodly",
      description: language === 'pl'
        ? "Aplikacja internetowa, która sugeruje najbardziej pasujące przepisy na podstawie wybranych składników"
        : "Web application that suggests the most suitable recipes based on selected ingredients",
      longDescription: language === 'pl'
        ? "Koodly to aplikacja internetowa, która pomaga użytkownikom znaleźć przepisy kulinarne na podstawie składników, które mają pod ręką. Użytkownicy mogą wprowadzić składniki, a aplikacja zasugeruje przepisy, które można z nich przygotować."
        : "Koodly is a web application that helps users find culinary recipes based on the ingredients they have on hand. Users can input ingredients, and the application will suggest recipes that can be prepared from them.",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: "/Portfolio/projects/koodly-ss.webp",
      logo: "/Portfolio/projects/koodly-logo.png",
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
