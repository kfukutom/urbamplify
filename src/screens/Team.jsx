import React from 'react';
import '../screen-styles/Team.css';
import kenHeadshot from '../assets/ken_headshot.png'

const Team = () => {
  const teamMembers = [
    {
      name: 'Ken Fukutomi',
      role: 'Lead Engineer - Co-Founder',
      image: kenHeadshot,
      bio: `Ken Fukutomi, the Lead Engineer and Co-Founder of our company, brings a wealth of experience in construction engineering and technology. With a background in civil engineering and expertise in AI and ML tools, Ken has been instrumental in developing innovative solutions to improve productivity in the construction and engineering industry. His unique blend of technical knowledge and leadership skills drives our team's commitment to excellence and cutting-edge innovation.`,
      linkedIn: 'https://www.linkedin.com/in/ken-fukutomi',
    },
    // Add more team members here as needed
  ];

  return (
    <main className="team">
      <h1 className="team-header">Our Team</h1>
      {teamMembers.map((member, index) => (
        <div key={index} className="team-member">
          <div className="member-image">
            <img src={member.image} alt={member.name} />
          </div>
          <div className="member-info">
            <h2 className="member-name">{member.name}</h2>
            <p className="member-role">{member.role}</p>
            <p className="member-bio">{member.bio}</p>
            <a 
              href={member.linkedIn} 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-link"
              aria-label={`Visit ${member.name}'s LinkedIn profile`}
            >
              LinkedIn
            </a>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Team;