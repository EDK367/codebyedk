export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  technologies: string[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'comp-script',
    title: 'Comp-Script',
    shortDescription: 'Java-based compiler simulator with custom lexical and syntactic analysis.',
    fullDescription: '<p>This project is a Java-based compiler simulator that mimics the syntax and behavior of JavaScript, implemented using JFlex, JCup, and Swing. It features a custom lexer and parser designed to recognize a JavaScript-inspired syntax.</p>',
    imageUrl: 'assets/img/comp-script.png',
    githubUrl: 'https://github.com/EDK367/CompScript',
    tags: ['Java', 'Compiler'],
    technologies: ['Java', 'JFlex', 'JCup', 'Swing UI'],
    features: ['Lexical analysis', 'Syntactic parsing', 'Custom grammar rules', 'Visual parse tree representation']
  },
  {
    id: 'campus-league',
    title: 'Campus League',
    shortDescription: 'University sports league management platform.',
    fullDescription: '<p>Campus League is a platform specialized in the creation, management, and administration of university sports leagues. The system is built with cutting-edge technologies such as Spring Boot for the backend and Angular for the frontend, ensuring performance, scalability, and a smooth user experience. The database used is MySQL, allowing for robust and efficient management of data related to teams, players, tournaments, matches, and more.</p>',
    imageUrl: 'assets/img/logo-campus-league.png',
    githubUrl: 'https://github.com/EDK367/Campus_League',
    tags: ['Java', 'Web', 'Spring Boot'],
    technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST API'],
    features: ['Tournament generation', 'Team management', 'Match scheduling', 'Real-time standings', 'User roles and permissions']
  },
  {
    id: 'vigilant-eye',
    title: 'Vigilant Eye',
    shortDescription: 'Fatigue detection system to prevent car accidents.',
    fullDescription: '<p>Vigilant Eye is an application designed to prevent car accidents caused by falling asleep at the wheel. Using advanced facial recognition technology, the app monitors key facial gestures in real time, such as yawning, short and long blinks, head nodding, eye rubbing, and other indicators of fatigue.</p>',
    imageUrl: 'assets/img/ojo-vigilante.png',
    githubUrl: 'https://github.com/EDK367/Ojo_Vigilante',
    tags: ['Python', 'AI/ML', 'Mobile'],
    technologies: ['Python', 'Kivy', 'Mediapipe', 'OpenCV'],
    features: ['Real-time facial tracking', 'Blink duration analysis', 'Yawn detection', 'Audio alerts for driver', 'Mobile-optimized UI via Kivy']
  }
];
