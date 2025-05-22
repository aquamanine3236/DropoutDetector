export interface TeamMember {
  name: string;
  studentId?: string; // Optional for supervisor
  github: string;
  image: string;
  role: 'Supervisor' | 'Member';
  description?: string; // Optional for all members
  email?: string; // Optional for all members
  linkedin?: string; // Optional for all members
}

export const teamData: TeamMember[] = [
  {
    name: 'Võ Nguyễn Lê Duy',
    github: 'http://vonguyenleduy.github.io/',
    image: '/supervisor.jpg', // Corrected path with leading slash
    role: 'Supervisor',
    description: 'Project Guide and Reviewer',
    email: 'nguyenvananh@example.com',
    linkedin: 'https://www.linkedin.com/in/vo-nguyen-le-duy/?originalSubdomain=vn',
  },
  {
    name: 'Nguyễn Xuân Phúc',
    studentId: '23521213',
    github: 'https://github.com/PuxhocDL',
    image: '/teammember1.png', // Corrected path with leading slash
    role: 'Member',
    description: 'Responsible for building the demo, EDA, and data validation',
    email: 'nguyenxuanphuc010205@gmail.com',
    linkedin: 'https://www.linkedin.com/in/tranvanbao',
  },
  {
    name: 'Tăng Hoàng Phúc',
    studentId: '23521219',
    github: 'https://github.com/tanghoangphuc',
    image: '/teammember2.png', // Corrected path with leading slash
    role: 'Member',
    description: 'Responsible for processing and writing the report',
    email: '23521219@gm.uit.edu.vn',
    linkedin: 'https://www.linkedin.com/in/tanghoangphuc',
  },
  {
    name: 'Trương Thiên Phú',
    studentId: '23521190',
    github: 'https://github.com/truongthienphu',
    image: '/teammember3.png', // Corrected path with leading slash
    role: 'Member',
    description: 'Responsible for feature engineering and writing the report',
    email: '23521190@gm.uit.edu.vn',
    linkedin: 'https://www.linkedin.com/in/truongthienphu',
  },
  {
    name: 'Phan Thủy Phương',
    studentId: '23521248',
    github: 'https://github.com/aquamanine3236',
    image: '/teammember4.png', // Corrected path with leading slash
    role: 'Member',
    description: 'Responsible for building the model and creating slides',
    email: '23521248@gm.uit.edu.vn',
    linkedin: 'https://www.linkedin.com/in/ph%C6%B0%C6%A1ng-phan-th%E1%BB%A7y-059762364/?fbclid=IwY2xjawKb_dtleHRuA2FlbQIxMABicmlkETExR1lvaFpKQXpza25LS1E4AR6GEbCM6Wk1UG78j0LbG99O8xgk9S6pWSl3OQxuJt4MtRLFuDUb0mJ8rTo3ug_aem_4a76wA-Rem1Av0prMI137g',
  },
];