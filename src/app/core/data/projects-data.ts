export interface Project {
  id: string;
  title: string;
  featured?: boolean;
  shortDescription: string;
  shortDescriptionEs: string;
  fullDescription: string;
  fullDescriptionEs: string;
  imageUrl: string;
  icon?: string;
  githubUrl?: string;
  frontendGithubUrl?: string;
  demoUrl?: string;
  tags: string[];
  technologies: string[];
  features: string[];
  featuresEs: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'nova-transform',
    title: 'Nova Transform',
    featured: true,
    shortDescription: 'Full-stack gym and athletic academy management platform built with Quarkus, PostgreSQL, and React.',
    shortDescriptionEs: 'Plataforma integral de gestión para gimnasios y centros deportivos construida con Quarkus, PostgreSQL y React.',
    fullDescription: '<p>Nova Transform is a full-stack enterprise platform for high-performance gyms and sports academies. The backend is built with Java 21 and Quarkus 3.39 using PostgreSQL with Flyway migrations, Hibernate ORM Panache, RS256 SmallRye JWT authentication, PDF/QR voucher and credential generation, and transactional emails via Resend. The frontend SPA uses React 18, TypeScript, Tailwind CSS, TanStack Query, and Recharts analytics.</p>',
    fullDescriptionEs: '<p>Nova Transform es una plataforma empresarial full stack para la gestión integral de gimnasios y academias deportivas. El backend está desarrollado con Java 21 y Quarkus 3.39 sobre PostgreSQL con migraciones Flyway, Hibernate ORM Panache, autenticación SmallRye JWT RS256, generación de comprobantes y carnets PDF con código QR y correos transaccionales vía Resend. El frontend SPA utiliza React 18, TypeScript, Tailwind CSS, TanStack Query y analítica con Recharts.</p>',
    imageUrl: 'assets/img/nova-transform.png',
    icon: 'fas fa-dumbbell',
    githubUrl: 'https://github.com/EDK367/nova-transform',
    frontendGithubUrl: 'https://github.com/EDK367/nova-transform-frontend',
    demoUrl: 'https://nova-transform-frontend-beige.vercel.app',
    tags: ['Java', 'Web'],
    technologies: ['Java 21', 'Quarkus', 'PostgreSQL', 'React', 'TypeScript', 'Tailwind CSS', 'Flyway', 'JWT RS256'],
    features: [
      'Multi-branch, staff, membership, and class administration',
      'Automated PDF invoicing and QR digital credentials',
      'Analytics dashboard with Recharts and TanStack React Query',
      'Role-based RS256 JWT security and Scalar/OpenAPI docs'
    ],
    featuresEs: [
      'Administración de sucursales, personal, membresías y clases',
      'Generación de facturas en PDF y credenciales digitales con código QR',
      'Panel de analítica interactivo con Recharts y TanStack React Query',
      'Seguridad basada en roles con JWT RS256 y documentación Scalar/OpenAPI'
    ]
  },
  {
    id: 'home-desk',
    title: 'HomeDesk ERP',
    featured: true,
    shortDescription: 'Monolithic ERP for purchasing, sales, FIFO inventory control, and billing with Spring Boot, Angular, and PostgreSQL.',
    shortDescriptionEs: 'Sistema ERP monolítico para compras, ventas, control de inventario PEPS y facturación con Spring Boot, Angular y PostgreSQL.',
    fullDescription: '<p>HomeDesk ERP centralizes business operations for office and home equipment commerce. Built with Java 21, Spring Boot 4, PostgreSQL, Flyway, Spring Security JWT with HTTP-Only refresh cookies, MapStruct, and STOMP WebSockets on the backend, paired with a modern Angular 21 + TypeScript frontend featuring real-time low-stock alerts and PDF reporting.</p>',
    fullDescriptionEs: '<p>HomeDesk ERP centraliza la operación comercial y de almacén para equipo y mobiliario de oficina y hogar. Construido con Java 21, Spring Boot 4, PostgreSQL, Flyway, Spring Security JWT con cookies HTTP-Only, MapStruct y WebSockets STOMP en el backend, integrado con un frontend moderno en Angular 21 y TypeScript con alertas de stock en tiempo real y exportación PDF.</p>',
    imageUrl: 'assets/img/home-desk.png',
    icon: 'fas fa-boxes-stacked',
    githubUrl: 'https://github.com/EDK367/home-desk-back',
    frontendGithubUrl: 'https://github.com/EDK367/home-desk-front',
    demoUrl: 'https://home-desk-front.vercel.app',
    tags: ['Java', 'Web'],
    technologies: ['Java 21', 'Spring Boot', 'Angular', 'PostgreSQL', 'TypeScript', 'WebSocket (STOMP)', 'Flyway', 'Docker'],
    features: [
      'Purchase orders with automatic tax calculation and lot generation',
      'Strict FIFO (PEPS) inventory dispatch and minimum stock alerts',
      'Multi-method payment collections and full user audit trail',
      'Real-time WebSocket push notifications in Angular 21 UI'
    ],
    featuresEs: [
      'Órdenes de compra con cálculo automático de impuestos y lotes',
      'Despacho estricto de inventario bajo método PEPS/FIFO y alertas de stock',
      'Gestión de cobranzas multimétodo y trazabilidad completa de auditoría',
      'Notificaciones push en tiempo real vía WebSocket en interfaz Angular 21'
    ]
  },
  {
    id: 'exam-prep-ai',
    title: 'Exam Prep AI',
    featured: true,
    shortDescription: 'RAG AI exam preparation platform with async PDF vectorization using FastAPI, pgvector, Celery, and Vue 3.',
    shortDescriptionEs: 'Plataforma de preparación de exámenes con IA RAG, vectorización asíncrona de PDFs con FastAPI, pgvector, Celery y Vue 3.',
    fullDescription: '<p>Exam Prep AI lets students upload study PDFs, automatically extract and vectorize content using embeddings and pgvector semantic search, and generate custom exam simulations with immediate feedback. Its asynchronous Python 3.12 + FastAPI backend leverages SQLAlchemy Async, PostgreSQL + pgvector, Celery, Redis, OpenTelemetry, and Supabase, paired with a Vue 3 + Vuetify 3 + Pinia frontend.</p>',
    fullDescriptionEs: '<p>Exam Prep AI permite cargar documentos PDF de estudio, extraer y vectorizar automáticamente su contenido mediante embeddings y búsqueda semántica con pgvector, y generar simulacros de examen con retroalimentación inmediata. Su backend asíncrono en Python 3.12 y FastAPI integra SQLAlchemy Async, PostgreSQL + pgvector, Celery, Redis y Supabase, junto a un frontend en Vue 3, Vuetify 3 y Pinia.</p>',
    imageUrl: 'assets/img/exam-prep-ai.png',
    icon: 'fas fa-brain',
    githubUrl: 'https://github.com/EDK367/exam-prep-ai-backend',
    frontendGithubUrl: 'https://github.com/EDK367/exam-prep-ai-fronted',
    tags: ['Python', 'AI/ML', 'Web'],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'Vue.js', 'TypeScript', 'Celery', 'Redis', 'Docker'],
    features: [
      'RAG pipeline with semantic text splitting and vector embeddings',
      'Async PDF/OCR ingestion queue with Celery, Redis, and Flower',
      'Interactive quiz & mock exam engine in Vue 3 + Vuetify 3',
      'Observability with OpenTelemetry, Prometheus, and Sentry'
    ],
    featuresEs: [
      'Pipeline RAG con segmentación semántica y búsqueda vectorial en pgvector',
      'Procesamiento asíncrono de PDFs y OCR con Celery, Redis y Flower',
      'Motor interactivo de cuestionarios y exámenes en Vue 3 y Vuetify 3',
      'Observabilidad integrada con OpenTelemetry, Prometheus y Sentry'
    ]
  },
  {
    id: 'vigilant-eye',
    title: 'Vigilant Eye',
    featured: true,
    shortDescription: 'Real-time driver fatigue detection system using facial recognition to prevent road accidents.',
    shortDescriptionEs: 'Sistema de detección de fatiga al volante en tiempo real mediante reconocimiento facial para prevenir accidentes.',
    fullDescription: '<p>Vigilant Eye is an application designed to prevent car accidents caused by falling asleep at the wheel. Using advanced facial recognition technology, the app monitors key facial gestures in real time, such as yawning, short and long blinks, head nodding, eye rubbing, and other indicators of fatigue.</p>',
    fullDescriptionEs: '<p>Vigilant Eye (Ojo Vigilante) es una aplicación diseñada para prevenir accidentes automovilísticos causados por quedarse dormido al volante. Utilizando tecnología avanzada de reconocimiento facial, la aplicación monitorea gestos faciales clave en tiempo real, como bostezos, parpadeos cortos y largos, cabeceos, frotarse los ojos y otros indicadores de fatiga.</p>',
    imageUrl: 'assets/img/ojo-vigilante.png',
    icon: 'fas fa-eye',
    githubUrl: 'https://github.com/EDK367/Ojo_Vigilante',
    tags: ['Python', 'AI/ML', 'Mobile'],
    technologies: ['Python', 'Kivy', 'MediaPipe', 'OpenCV'],
    features: [
      'Real-time facial landmark tracking with MediaPipe Face Mesh',
      'Eye Aspect Ratio (EAR) blink duration and drowsiness analysis',
      'Yawn, head-nod, and eye-rubbing detection',
      'Audio alerts for the driver with Kivy cross-platform UI'
    ],
    featuresEs: [
      'Seguimiento facial en tiempo real con MediaPipe Face Mesh',
      'Cálculo de EAR para duración de parpadeos y somnolencia',
      'Detección de bostezos, cabeceos y frotamiento de ojos',
      'Alertas sonoras para el conductor con interfaz Kivy'
    ]
  },
  {
    id: 'nexus-solairy',
    title: 'Nexus Solairy',
    shortDescription: 'Multi-language compiler and IDE translating high-level OOP/functional code to Three-Address Code and RISC-V RV32I assembly.',
    shortDescriptionEs: 'Compilador multi-lenguaje e IDE con traducción a Código de Tres Direcciones (C3D) y ensamblador RISC-V RV32I.',
    fullDescription: '<p>Nexus Solairy is an advanced compiler and integrated development environment built in Java 21, JavaFX 21, and ANTLR4. It lexes, parses, semantically validates, and compiles three independent languages (Zetariano, PigLatin, and Y?) into Three-Address Code (C3D) over linear Stack/Heap models and functional RISC-V RV32I assembly compatible with RARS.</p>',
    fullDescriptionEs: '<p>Nexus Solairy es un compilador avanzado y entorno de desarrollo integrado desarrollado en Java 21, JavaFX 21 y ANTLR4. Procesa, valida semánticamente y compila tres lenguajes independientes (Zetariano, PigLatin y Y?) hacia Código de Tres Direcciones (C3D) sobre Stack/Heap lineales y código ensamblador RISC-V RV32I compatible con RARS.</p>',
    imageUrl: 'assets/img/nexus-solairy.png',
    icon: 'fas fa-microchip',
    githubUrl: 'https://github.com/EDK367/nexus-solairy',
    tags: ['Java', 'Compilers'],
    technologies: ['Java 21', 'JavaFX', 'ANTLR4', 'RISC-V Assembly', 'Maven'],
    features: [
      'Multi-language compilation pipeline (Zetariano, PigLatin, Y?)',
      'OOP support with inheritance, dynamic dispatch, and polymorphism',
      'Intermediate C3D quartet generation and RISC-V RV32I output',
      'Integrated JavaFX IDE with live memory inspection and terminal'
    ],
    featuresEs: [
      'Pipeline de compilación para tres lenguajes (Zetariano, PigLatin, Y?)',
      'Soporte OOP con herencia, despacho dinámico y polimorfismo',
      'Generación de Código de Tres Direcciones (C3D) y ensamblador RISC-V RV32I',
      'IDE integrado en JavaFX con inspección de memoria y terminal en vivo'
    ]
  },
  {
    id: 'ateneo',
    title: 'Ateneo SGD',
    shortDescription: 'Distributed document management system with MongoDB GridFS binary streaming, RBAC, and Angular 21 UI.',
    shortDescriptionEs: 'Sistema de gestión documental distribuido con streaming binario en MongoDB GridFS, RBAC y frontend en Angular 21.',
    fullDescription: '<p>Ateneo is an institutional Document Management System (SGD) built with NestJS 12, TypeScript, and MongoDB GridFS on the backend paired with an Angular 21 + Tailwind CSS frontend. It supports hierarchical folder trees using indexed ancestors, granular read/comment/edit sharing, cascade trash recovery, storage quotas, and activity auditing.</p>',
    fullDescriptionEs: '<p>Ateneo es un Sistema de Gestión Documental (SGD) institucional desarrollado con NestJS 12, TypeScript y MongoDB GridFS en el backend, junto a un frontend en Angular 21 y Tailwind CSS. Soporta jerarquías de carpetas con ancestros indexados, compartición granular por roles (RBAC), papelera en cascada, cuotas dinámicas y auditoría de operaciones.</p>',
    imageUrl: 'assets/img/ateneo.png',
    icon: 'fas fa-folder-tree',
    githubUrl: 'https://github.com/EDK367/ateneo-back',
    frontendGithubUrl: 'https://github.com/EDK367/ateneo-front',
    tags: ['Web'],
    technologies: ['NestJS', 'Angular', 'TypeScript', 'MongoDB', 'GridFS', 'Tailwind CSS', 'JWT'],
    features: [
      'Binary streaming upload/download via MongoDB GridFS',
      'Indexed ancestor folder tree for fast deep directory queries',
      'Granular RBAC permissions and cascade recycle bin recovery',
      'Dynamic storage quota calculation and Scalar API documentation'
    ],
    featuresEs: [
      'Carga y descarga en streaming binario mediante MongoDB GridFS',
      'Árbol jerárquico con ancestros indexados para consultas rápidas',
      'Permisos granulares RBAC y papelera con restauración en cascada',
      'Cálculo dinámico de cuotas de almacenamiento y auditoría de usuarios'
    ]
  },
  {
    id: 'ergoproxy',
    title: 'Ergo Notes',
    shortDescription: 'Secure collaborative post-it notes web app with Spring Boot 4, OAuth2, PostgreSQL, and React 19.',
    shortDescriptionEs: 'Aplicación web colaborativa de notas seguras tipo post-it con Spring Boot 4, OAuth2, PostgreSQL y React 19.',
    fullDescription: '<p>Ergo Notes (ErgoProxy) is a full-stack secure note management application allowing users to create, organize, sanitize, and share notes. Its backend runs on Java 21, Spring Boot 4, Spring Security with OAuth2/JWT, Flyway, and PostgreSQL, while the frontend uses React 19, TypeScript, Zustand, DOMPurify, and Vite.</p>',
    fullDescriptionEs: '<p>Ergo Notes (ErgoProxy) es una aplicación web segura para crear, organizar y compartir notas tipo post-it. Su backend está construido con Java 21, Spring Boot 4, Spring Security con OAuth2/JWT, Flyway y PostgreSQL, mientras que el frontend utiliza React 19, TypeScript, Zustand, DOMPurify y Vite.</p>',
    imageUrl: '',
    icon: 'fas fa-note-sticky',
    githubUrl: 'https://github.com/EDK367/ergoproxy-backend',
    frontendGithubUrl: 'https://github.com/EDK367/ergoproxy-frontend',
    demoUrl: 'https://ergoproxy-fronted.vercel.app',
    tags: ['Java', 'Web'],
    technologies: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'OAuth2', 'Docker'],
    features: [
      'OAuth2 client/resource server and JWT authentication',
      'XSS-sanitized note editing with DOMPurify and Zustand state',
      'PostgreSQL persistence with Flyway schema migrations',
      'Containerized backend with Docker Compose and OpenAPI docs'
    ],
    featuresEs: [
      'Autenticación segura con OAuth2 y JWT en Spring Security',
      'Edición sanitizada contra XSS con DOMPurify y estado en Zustand',
      'Persistencia en PostgreSQL con migraciones gestionadas por Flyway',
      'Backend contenerizado con Docker Compose y documentación OpenAPI'
    ]
  },
  {
    id: 'ledger-core',
    title: 'LedgerCore Backend',
    shortDescription: 'High-performance Go REST API using Echo, GORM, PostgreSQL, JWT authentication, and Swagger docs.',
    shortDescriptionEs: 'API REST de alto rendimiento en Go con Echo, GORM, PostgreSQL, autenticación JWT y documentación Swagger.',
    fullDescription: '<p>LedgerCore Backend is a Go 1.24 backend service built on the Echo web framework, GORM ORM with PostgreSQL driver, JWT v5 authentication middleware, bcrypt password hashing, and automated Swagger/OpenAPI documentation.</p>',
    fullDescriptionEs: '<p>LedgerCore Backend es un servicio backend desarrollado en Go 1.24 con el framework Echo, GORM sobre PostgreSQL, autenticación con JWT v5, cifrado bcrypt y documentación interactiva mediante Swagger/OpenAPI.</p>',
    imageUrl: '',
    icon: 'fab fa-golang',
    githubUrl: 'https://github.com/EDK367/LedgerCoreBackend',
    tags: ['Go'],
    technologies: ['Go', 'Echo', 'GORM', 'PostgreSQL', 'JWT', 'Swagger'],
    features: [
      'Modular REST endpoints powered by Labstack Echo v4',
      'Relational persistence via GORM and PostgreSQL driver',
      'JWT v5 authentication and bcrypt security',
      'Interactive API specification with Echo-Swagger'
    ],
    featuresEs: [
      'Endpoints REST modulares desarrollados con Labstack Echo v4',
      'Persistencia relacional con GORM y PostgreSQL',
      'Autenticación JWT v5 y hashing seguro con bcrypt',
      'Documentación interactiva de endpoints con Echo-Swagger'
    ]
  },
  {
    id: 'solairy-os',
    title: 'SolairyOS',
    shortDescription: 'Experimental 32-bit baremetal operating system kernel written in Go and NASM Assembly.',
    shortDescriptionEs: 'Kernel experimental de sistema operativo bare-metal de 32 bits escrito en Go y ensamblador NASM.',
    fullDescription: '<p>SolairyOS is an experimental 32-bit baremetal kernel written in Go (TinyGo) and x86 NASM Assembly. It implements a custom VGA text-mode display driver, custom linker script, and boots via GRUB2 using the Multiboot specification.</p>',
    fullDescriptionEs: '<p>SolairyOS es un kernel bare-metal experimental de 32 bits escrito en Go (TinyGo) y ensamblador NASM x86. Incluye un controlador VGA propio en modo texto, linker script personalizado y arranque mediante GRUB2 bajo la especificación Multiboot.</p>',
    imageUrl: 'assets/img/solairy-os.png',
    icon: 'fas fa-terminal',
    githubUrl: 'https://github.com/EDK367/solairy-os',
    tags: ['Go', 'Systems'],
    technologies: ['Go', 'Assembly', 'GRUB2', 'Makefile', 'Linker Script'],
    features: [
      'Custom Multiboot header and x86 bootloader entry in Assembly',
      '32-bit Go kernel compiled for bare-metal execution',
      'Direct VGA text-mode hardware driver',
      'Automated bootable ISO image pipeline via GRUB2 and xorriso'
    ],
    featuresEs: [
      'Cabecera Multiboot y arranque x86 en ensamblador NASM',
      'Kernel de 32 bits en Go compilado para ejecución bare-metal',
      'Driver directo de hardware VGA en modo texto',
      'Generación automatizada de imagen ISO booteable con GRUB2 y xorriso'
    ]
  },
  {
    id: 'compiler-guide',
    title: 'Compiler Guide',
    shortDescription: 'Interactive educational guide on syntax-directed translation, type checking, and intermediate code generation.',
    shortDescriptionEs: 'Guía web interactiva sobre traducción dirigida por la sintaxis, comprobación de tipos y código intermedio.',
    fullDescription: '<p>Compiler Guide is an interactive documentation and learning web application built with Astro, Vue 3, TypeScript, and CodeMirror, featuring live code editors and visual explanations of compiler phases.</p>',
    fullDescriptionEs: '<p>Compiler Guide es una aplicación web educativa interactiva construida con Astro, Vue 3, TypeScript y CodeMirror, enfocada en traducción dirigida por la sintaxis, comprobación de tipos y generación de código intermedio.</p>',
    imageUrl: 'assets/img/compiler-guide.png',
    icon: 'fas fa-book-open',
    githubUrl: 'https://github.com/EDK367/compiler-guide',
    demoUrl: 'https://compiler-guide.vercel.app',
    tags: ['Web', 'Compilers'],
    technologies: ['Astro', 'Vue.js', 'TypeScript', 'CodeMirror', 'CSS'],
    features: [
      'Interactive CodeMirror syntax playground in the browser',
      'Detailed visual guides on type systems and intermediate code',
      'Hybrid Astro islands with Vue 3 reactive components'
    ],
    featuresEs: [
      'Editor interactivo CodeMirror integrado en el navegador',
      'Guías visuales de comprobación de tipos y código intermedio',
      'Arquitectura híbrida con Astro y componentes reactivos Vue 3'
    ]
  },
  {
    id: 'dev-explorer',
    title: 'DevExplorer',
    shortDescription: 'Multilingual developer reference web app built with Next.js 16, React 19, Framer Motion, and PrismJS.',
    shortDescriptionEs: 'Plataforma web multilingüe de referencia para desarrolladores construida con Next.js 16, React 19 y Framer Motion.',
    fullDescription: '<p>DevExplorer is a modern web platform built with Next.js 16, React 19, TypeScript, Framer Motion animations, PrismJS syntax highlighting, and full i18next internationalization.</p>',
    fullDescriptionEs: '<p>DevExplorer es una aplicación web moderna desarrollada con Next.js 16, React 19, TypeScript, animaciones con Framer Motion, resaltado de código con PrismJS e internacionalización con i18next.</p>',
    imageUrl: '',
    icon: 'fas fa-compass',
    githubUrl: 'https://github.com/EDK367/DevExplorer',
    demoUrl: 'https://dev-explorer-eight.vercel.app',
    tags: ['Web'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'i18next'],
    features: [
      'Smooth motion choreography using Framer Motion',
      'Multi-language support via next-intl and i18next',
      'Code syntax highlighting with PrismJS'
    ],
    featuresEs: [
      'Transiciones fluidas e interactivas con Framer Motion',
      'Soporte multilingüe mediante next-intl e i18next',
      'Resaltado de sintaxis de código con PrismJS'
    ]
  },
  {
    id: 'blender-handbook',
    title: 'Blender Handbook',
    shortDescription: 'High-density Spanish Blender manual and cheat sheet with instant fuzzy search in Next.js and Tailwind.',
    shortDescriptionEs: 'Manual práctico y cheat sheet de Blender en español con búsqueda fuzzy instantánea en Next.js y Tailwind.',
    fullDescription: '<p>Blender Handbook is a modern Next.js App Router, TypeScript, and Tailwind CSS reference platform based on official Blender documentation, featuring instant Fuse.js fuzzy search across shortcuts and workflows.</p>',
    fullDescriptionEs: '<p>Blender Handbook es una aplicación web moderna construida con Next.js (App Router), TypeScript y Tailwind CSS basada en el manual oficial de Blender, con búsqueda fuzzy ultrarrápida mediante Fuse.js.</p>',
    imageUrl: 'assets/img/blender-handbook.png',
    icon: 'fas fa-cubes',
    githubUrl: 'https://github.com/EDK367/blender-handbook',
    demoUrl: 'https://blender-handbook.vercel.app',
    tags: ['Web'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Fuse.js'],
    features: [
      'Instant Ctrl+K fuzzy search powered by Fuse.js',
      'Structured Blender shortcuts, modeling, and rendering cheat sheets',
      'Responsive Next.js App Router interface with Tailwind CSS'
    ],
    featuresEs: [
      'Búsqueda fuzzy instantánea (Ctrl+K) impulsada por Fuse.js',
      'Guías rápidas de atajos, modelado y renderizado en Blender',
      'Interfaz responsiva con Next.js App Router y Tailwind CSS'
    ]
  },
  {
    id: 'nexus-antiquus',
    title: 'Nexus Antiquus',
    shortDescription: 'IDE, compiler, AST/parser visualizer, and PigLatin transpiler for Codex Latinus in Java 21 and ANTLR4.',
    shortDescriptionEs: 'IDE, compilador, visualizador AST/SRA y transpilador a PigLatin para Codex Latinus en Java 21 y ANTLR4.',
    fullDescription: '<p>Nexus Antiquus implements a complete formal-language processing pipeline in Java 21, JavaFX 21, and ANTLR4 for the structured language Codex Latinus (.lat): lexical/syntactic/semantic analysis, nested symbol tables, interactive AST rendering, shift-reduce automaton tracing, PigLatin transpilation, and real-time execution.</p>',
    fullDescriptionEs: '<p>Nexus Antiquus implementa un pipeline completo de procesamiento de lenguajes formales en Java 21, JavaFX 21 y ANTLR4 para Codex Latinus (.lat): análisis léxico, sintáctico y semántico, tabla de símbolos con ámbitos anidados, visualización gráfica del AST, traza del autómata SRA, transpilación a PigLatin y consola interactiva.</p>',
    imageUrl: 'assets/img/nexus-antiquus.png',
    icon: 'fas fa-sitemap',
    githubUrl: 'https://github.com/EDK367/nexus-antiquus',
    tags: ['Java', 'Compilers'],
    technologies: ['Java 21', 'JavaFX', 'ANTLR4', 'Maven'],
    features: [
      'Interactive graphical AST and parser stack (SRA) visualization',
      'Nested symbol table with static semantic type verification',
      'Source-to-source transpiler to PigLatin and live runtime console'
    ],
    featuresEs: [
      'Visualización gráfica interactiva del AST y pila del parser (SRA)',
      'Tabla de símbolos anidada con verificación semántica de tipos',
      'Transpilador a PigLatin y motor de ejecución en tiempo real'
    ]
  },
  {
    id: 'comp-script',
    title: 'Comp-Script',
    shortDescription: 'Java-based compiler simulator with custom lexical and syntactic analysis.',
    shortDescriptionEs: 'Simulador de compilador en Java con análisis léxico y sintáctico personalizado.',
    fullDescription: '<p>This project is a Java-based compiler simulator that mimics the syntax and behavior of JavaScript, implemented using JFlex, JCup, and Swing. It features a custom lexer and parser designed to recognize a JavaScript-inspired syntax.</p>',
    fullDescriptionEs: '<p>Este proyecto es un simulador de compilador basado en Java que imita la sintaxis y el comportamiento de JavaScript, implementado con JFlex, JCup y Swing, con analizador léxico y sintáctico personalizado.</p>',
    imageUrl: 'assets/img/comp-script.png',
    icon: 'fas fa-code',
    githubUrl: 'https://github.com/EDK367/CompScript',
    tags: ['Java', 'Compilers'],
    technologies: ['Java', 'JFlex', 'JCup', 'Swing UI'],
    features: ['Lexical analysis', 'Syntactic parsing', 'Custom grammar rules', 'Visual parse tree representation'],
    featuresEs: ['Análisis léxico con JFlex', 'Análisis sintáctico con JCup', 'Reglas gramaticales personalizadas', 'Visualización del árbol de análisis']
  },
  {
    id: 'campus-league',
    title: 'Campus League',
    shortDescription: 'University sports league management platform built with Spring Boot, Angular, and MySQL.',
    shortDescriptionEs: 'Plataforma de gestión de ligas deportivas universitarias con Spring Boot, Angular y MySQL.',
    fullDescription: '<p>Campus League is a platform specialized in the creation, management, and administration of university sports leagues. The system is built with Spring Boot for the backend and Angular for the frontend, backed by MySQL for managing teams, players, tournaments, and matches.</p>',
    fullDescriptionEs: '<p>Campus League es una plataforma especializada en la creación, gestión y administración de ligas deportivas universitarias, desarrollada con Spring Boot en el backend, Angular en el frontend y MySQL para administrar equipos, jugadores, torneos y partidos.</p>',
    imageUrl: 'assets/img/logo-campus-league.png',
    icon: 'fas fa-trophy',
    githubUrl: 'https://github.com/EDK367/Campus_League',
    tags: ['Java', 'Web'],
    technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST API'],
    features: ['Tournament generation', 'Team management', 'Match scheduling', 'Real-time standings', 'User roles and permissions'],
    featuresEs: ['Generación de torneos', 'Gestión de equipos y jugadores', 'Programación de partidos', 'Tabla de posiciones en tiempo real', 'Roles y permisos']
  },
  {
    id: 'ethereal-codex-graph',
    title: 'EtherealCodexGraph',
    shortDescription: 'JavaFX library and transport route system implementing AVL, B, B+ trees, hash tables, and graphs from scratch.',
    shortDescriptionEs: 'Sistema de bibliotecas y rutas en JavaFX con árboles AVL, B, B+, tablas hash y grafos desde cero.',
    fullDescription: '<p>EtherealCodexGraph is a Java 21 + JavaFX desktop application implementing core data structures from scratch — AVL, B, and B+ trees, hash tables, graphs, stacks, queues, and linked lists — to manage digital libraries, catalogs, and transport routing.</p>',
    fullDescriptionEs: '<p>EtherealCodexGraph es una aplicación de escritorio en Java 21 y JavaFX que implementa desde cero estructuras de datos como árboles AVL, B, B+, tablas hash, grafos, pilas, colas y listas enlazadas para gestionar bibliotecas y rutas de transporte.</p>',
    imageUrl: '',
    icon: 'fas fa-project-diagram',
    githubUrl: 'https://github.com/EDK367/EtherealCodexGraph',
    tags: ['Java'],
    technologies: ['Java 21', 'JavaFX', 'Maven', 'Data Structures'],
    features: [
      'Custom AVL, B, and B+ tree indexing from scratch',
      'Graph-based transport route calculation and visualization',
      'JavaFX desktop UI packaged with Maven'
    ],
    featuresEs: [
      'Indexación con árboles AVL, B y B+ implementados desde cero',
      'Cálculo y visualización de rutas de transporte mediante grafos',
      'Interfaz de escritorio JavaFX empaquetada con Maven'
    ]
  },
  {
    id: 'arcanum-library',
    title: 'ArcanumLibrary',
    shortDescription: 'C++ and Qt desktop digital library simulator using AVL, B, and B+ trees with CMake.',
    shortDescriptionEs: 'Simulador de biblioteca digital en C++ y Qt con árboles AVL, B y B+ compilado con CMake.',
    fullDescription: '<p>ArcanumLibrary is a cross-platform C++17 desktop application built with Qt Widgets and CMake, integrating advanced balanced tree data structures (AVL, B, and B+ trees) for modular digital library indexing and simulation.</p>',
    fullDescriptionEs: '<p>ArcanumLibrary es una aplicación de escritorio multiplataforma en C++17 con Qt Widgets y CMake que integra estructuras de datos avanzadas (árboles AVL, B y B+) para la gestión y simulación de una biblioteca digital.</p>',
    imageUrl: 'assets/img/arcanum-library.png',
    icon: 'fas fa-book',
    githubUrl: 'https://github.com/EDK367/ArcanumLibrary',
    tags: ['C++'],
    technologies: ['C++17', 'Qt', 'CMake', 'AVL / B / B+ Trees'],
    features: [
      'Native C++17 implementation of AVL, B, and B+ trees',
      'Cross-platform Qt Widgets desktop UI',
      'Modular CMake build system'
    ],
    featuresEs: [
      'Implementación nativa en C++17 de árboles AVL, B y B+',
      'Interfaz gráfica multiplataforma con Qt Widgets',
      'Sistema de compilación modular con CMake'
    ]
  },
  {
    id: 'boxbuilder-tc',
    title: 'BoxBuilder TC',
    shortDescription: 'Native C++17 and Qt desktop application for modular box construction and simulation.',
    shortDescriptionEs: 'Aplicación de escritorio nativa en C++17 y Qt para construcción y simulación modular de cajas.',
    fullDescription: '<p>BoxBuilder TC is a C++17 desktop application built with Qt Widgets and CMake, providing an interactive graphical environment for modular box assembly and visual simulation.</p>',
    fullDescriptionEs: '<p>BoxBuilder TC es una aplicación de escritorio en C++17 que utiliza Qt Widgets y CMake para ofrecer una experiencia gráfica robusta en la construcción modular y simulación de cajas.</p>',
    imageUrl: 'assets/img/boxbuilder-tc.png',
    icon: 'fas fa-box-open',
    githubUrl: 'https://github.com/EDK367/BoxBuilder_TC',
    tags: ['C++'],
    technologies: ['C++17', 'Qt', 'CMake'],
    features: [
      'Modular C++ architecture with Qt Widgets UI',
      '100% native performance and cross-platform CMake config'
    ],
    featuresEs: [
      'Diseño modular en C++ con interfaz gráfica Qt Widgets',
      'Rendimiento 100% nativo y compilación multiplataforma con CMake'
    ]
  },
  {
    id: 'config-hyprland',
    title: 'Hyprland Dotfiles',
    shortDescription: 'Custom Fedora Linux Wayland environment featuring Hyprland, Rofi, Hyprlock, and Noctalia scripts.',
    shortDescriptionEs: 'Entorno personalizado en Fedora Linux con Hyprland, Wayland, Rofi, Hyprlock, Hypridle y scripts.',
    fullDescription: '<p>Personal Linux desktop rice and dotfiles configuration for Fedora running Hyprland, complete with custom Rofi launcher, Hyprlock screen locker, Hypridle power management, Noctalia theme setup, and shell automation scripts.</p>',
    fullDescriptionEs: '<p>Configuración personal de escritorio Linux en Fedora con Hyprland, incluyendo lanzador Rofi personalizado, pantalla de bloqueo Hyprlock, gestión de inactividad Hypridle, tema Noctalia y scripts en Shell.</p>',
    imageUrl: 'assets/img/config-hyprland.png',
    icon: 'fab fa-linux',
    githubUrl: 'https://github.com/EDK367/config-hyprland',
    tags: ['Systems'],
    technologies: ['Shell', 'Hyprland', 'Wayland', 'Fedora Linux', 'Rofi'],
    features: [
      'Custom Hyprland window manager keybindings and animations',
      'Integrated Rofi launcher, Hyprlock, and Hypridle scripts'
    ],
    featuresEs: [
      'Atajos de teclado y animaciones personalizadas para Hyprland',
      'Lanzador Rofi, pantalla de bloqueo Hyprlock y scripts de automatización'
    ]
  }
];
