import React from 'react';

const Footer = () => {
  const teamMembers = [
    { name: 'Bravo Ivan', github: 'https://github.com/ivann-bravo' },
    { name: 'Gomez Martirena Fernando', github: 'https://github.com/FernandoGM51' },
    { name: 'Lopez Dylan', github: 'https://github.com/Dylan-Lopez' },
    { name: 'Lopez Enzo', github: 'https://github.com/enzo-lopez' },
    { name: 'Velardez Lucila', github: 'https://github.com/Lucila-Velardez333' },
  ];

  return (
    <footer className="app-footer">
      <p>Grupo 1 - Trabajo Práctico Cuatrimestral - Proyecto de Software</p>
      <div className="github-profiles">
        {teamMembers.map((member, index) => (
          <a key={index} href={member.github} target="_blank" rel="noopener noreferrer">
            <img
              src={`${member.github}.png`}
              alt={member.name}
              className="github-avatar"
            />
          </a>
        ))}
      </div>
      <a
        href="https://github.com/ivann-bravo/Netflix-Grupo1"
        target="_blank"
        rel="noopener noreferrer"
        className="repo-link"
      >
        Ir al repositorio
      </a>
    </footer>
  );
};

export default Footer;