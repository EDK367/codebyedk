import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'es';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal<Language>('en');

  private dictionaries = {
    en: {
      NAV_NAME: 'Erikson Orozco – Engineer in Progress',
      NAV_ABOUT: 'About Me',
      NAV_TECHNOLOGIES: 'Technologies',
      NAV_PROJECTS: 'Projects',
      NAV_CONTACT: 'Contact',
      NAV_CV: 'CV',
      HOME_FOOTER: '2025 Erikson',
      ABOUT_GREETING: 'Hi there! I\'m Erikson',
      ABOUT_TITLE: 'I\'m a backend specialist',
      ABOUT_INFO_1: 'I\'m currently pursuing a degree in Systems Engineering.',
      ABOUT_INFO_2: '',
      ABOUT_INFO_3: 'I have knowledge of various technologies and a strong',
      ABOUT_INFO_4: 'passion for software development.',
      ABOUT_MORE_BTN: 'More of Me',
      PROJECTS_TITLE: 'My Projects',
      PROJECT_COMP_DESC: 'This project is a Java-based compiler simulator that mimics the syntax and behavior of JavaScript, implemented using JFlex, JCup, and Swing. It features a custom lexer and parser designed to recognize a JavaScript-inspired syntax.',
      PROJECT_CAMPUS_DESC: 'Campus League is a platform specialized in the creation, management, and administration of university sports leagues. The system is built with cutting-edge technologies such as Spring Boot for the backend and Angular for the frontend, ensuring performance, scalability, and a smooth user experience. The database used is MySQL, allowing for robust and efficient management of data related to teams, players, tournaments, matches, and more.',
      PROJECT_OJO_DESC: 'Vigilant Eye is an application designed to prevent car accidents caused by falling asleep at the wheel. Using advanced facial recognition technology, the app monitors key facial gestures in real time, such as yawning, short and long blinks, head nodding, eye rubbing, and other indicators of fatigue.',
      GITHUB_BTN: 'GitHub',
      DETAILS_BTN: 'Details',
      MORE_PROJECTS_BTN: 'More Projects',
      MORE_ABOUT_TITLE: 'More About Me',
      MORE_ABOUT_TEXT: 'Here is some more detailed information about me...',
      MORE_TECH_TITLE: 'All Technologies',
      MORE_ABOUT_BTN: 'More About Me',
      MORE_TECH_BTN: 'More Technologies',
      TECH_TITLE: 'Skills',
      CONTACT_TITLE: 'Contact',
    },
    es: {
      NAV_NAME: 'Erikson Orozco – Ingeniero en Formación',
      NAV_ABOUT: 'Sobre mí',
      NAV_TECHNOLOGIES: 'Tecnologías',
      NAV_PROJECTS: 'Proyectos',
      NAV_CONTACT: 'Contacto',
      NAV_CV: 'CV',
      HOME_FOOTER: '2025 Erikson',
      ABOUT_GREETING: '¡Hola! Soy Erikson',
      ABOUT_TITLE: 'Soy especialista en backend',
      ABOUT_INFO_1: 'Actualmente estoy cursando la carrera de Ingeniería en Sistemas.',
      ABOUT_INFO_2: '',
      ABOUT_INFO_3: 'tengo conocimientos en varias tecnologías y una fuerte',
      ABOUT_INFO_4: 'pasión por el desarrollo de software.',
      ABOUT_MORE_BTN: 'Más de mí',
      PROJECTS_TITLE: 'Mis Proyectos',
      PROJECT_COMP_DESC: 'Este proyecto es un simulador de compilador basado en Java que imita la sintaxis y el comportamiento de JavaScript, implementado usando JFlex, JCup y Swing. Cuenta con un analizador léxico y sintáctico personalizado diseñado para reconocer una sintaxis inspirada en JavaScript.',
      PROJECT_CAMPUS_DESC: 'Campus League es una plataforma especializada en la creación, gestión y administración de ligas deportivas universitarias. El sistema está construido con tecnologías de vanguardia como Spring Boot para el backend y Angular para el frontend, garantizando rendimiento, escalabilidad y una experiencia de usuario fluida. La base de datos utilizada es MySQL, permitiendo una gestión robusta y eficiente de datos relacionados con equipos, jugadores, torneos, partidos y más.',
      PROJECT_OJO_DESC: 'Vigilant Eye es una aplicación diseñada para prevenir accidentes automovilísticos causados por quedarse dormido al volante. Utilizando tecnología avanzada de reconocimiento facial, la aplicación monitorea gestos faciales clave en tiempo real, como bostezos, parpadeos cortos y largos, cabeceos, frotarse los ojos y otros indicadores de fatiga.',
      GITHUB_BTN: 'GitHub',
      DETAILS_BTN: 'Detalles',
      MORE_PROJECTS_BTN: 'Más Proyectos',
      MORE_ABOUT_TITLE: 'Más Sobre Mí',
      MORE_ABOUT_TEXT: 'Aquí hay información más detallada sobre mí...',
      MORE_TECH_TITLE: 'Todas las Tecnologías',
      MORE_ABOUT_BTN: 'Más Sobre Mí',
      MORE_TECH_BTN: 'Más Tecnologías',
      TECH_TITLE: 'Habilidades',
      CONTACT_TITLE: 'Contacto',
    }
  };

  t = computed(() => this.dictionaries[this.currentLanguage()]);

  toggleLanguage(): void {
    this.currentLanguage.update(lang => lang === 'en' ? 'es' : 'en');
  }
}
