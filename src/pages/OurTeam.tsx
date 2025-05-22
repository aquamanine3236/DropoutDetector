import AnimationWrapper from "../components/AnimationWrapper";
import { teamData, TeamMember } from "../components/Team";
import { Github, Mail, Linkedin } from "lucide-react";

const TeamCard: React.FC<{ member: TeamMember; isSupervisor?: boolean; align?: "left" | "right" }> = ({
  member,
  isSupervisor = false,
  align = "left",
}) => {
  return (
    <div
      className={`group bg-white rounded-2xl shadow-xl p-6 md:p-8 flex ${
        isSupervisor ? "flex-col items-center max-w-md mx-auto" : align === "left" ? "flex-row" : "flex-row-reverse"
      } gap-6 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden ${
        isSupervisor ? "border-2 border-green-300" : ""
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Avatar with improved styling */}
      <div className={`relative ${isSupervisor ? "mb-8" : "flex-shrink-0"}`}>
        <div className={`absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-sm opacity-20 group-hover:opacity-40 transition-opacity duration-500 ${
          isSupervisor ? "w-36 h-36" : "w-28 h-28"
        }`}></div>
        <img
          src={member.image}
          alt={member.name}
          className={`relative rounded-full object-cover border-4 border-white shadow-lg group-hover:border-green-300 transition-all duration-300 ${
            isSupervisor ? "w-32 h-32" : "w-24 h-24 md:w-28 md:h-28"
          }`}
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/150";
          }}
        />
        {/* Role badge for supervisor */}
        {isSupervisor && (
          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Supervisor
          </div>
        )}
      </div>

      {/* Name and details */}
      <div className={`text-center ${isSupervisor ? "z-10 flex-1" : "flex-1 flex flex-col justify-center"} ${!isSupervisor && align === "right" ? "text-right" : "text-left"}`}>
        <h3 className={`font-bold text-green-700 mb-2 group-hover:text-green-600 transition-colors duration-300 ${
          isSupervisor ? "text-2xl" : "text-xl md:text-2xl"
        }`}>
          {member.name}
        </h3>
        
        {/* Role/Student ID */}
        <div className="mb-4">
          {isSupervisor ? (
            <div className="bg-gradient-to-r from-green-100 to-blue-100 text-green-700 font-semibold py-2 px-4 rounded-lg text-sm inline-block">
              Project Supervisor
            </div>
          ) : (
            <p className="text-green-700 text-sm font-medium bg-gray-100 py-1 px-3 rounded-full inline-block">
              ID: {member.studentId}
            </p>
          )}
        </div>

        {/* Bio or description if available */}
        {member.description && (
          <p className="text-green-700 text-sm mb-4 leading-relaxed">
            {member.description}
          </p>
        )}

        {/* Social links */}
        <div className={`flex justify-center space-x-3 mt-auto`}>
          <a
            href={member.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Github className="mr-2" size={16} />
            GitHub
          </a>
          
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Mail size={16} />
            </a>
          )}
          
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-2 px-3 rounded-lg text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              <Linkedin size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const OurTeam: React.FC = () => {
  const supervisor = teamData.find((member) => member.role === "Supervisor");
  const members = teamData.filter((member) => member.role === "Member");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white py-20 px-4 md:px-8">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <AnimationWrapper direction="up">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Our Team
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-green-700 max-w-4xl mx-auto leading-relaxed">
              Meet the passionate individuals behind the Academic Success Dataset project. 
              Our diverse team combines expertise, creativity, and dedication to deliver exceptional results.
            </p>
          </div>
        </AnimationWrapper>

        {/* Supervisor Section */}
        {supervisor && (
          <section className="mb-20">
            <AnimationWrapper direction="up" delay={0.1}>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-700 mb-4">
                  Project Leadership
                </h2>
                <p className="text-green-700 text-lg max-w-2xl mx-auto">
                  Led by our esteemed supervisor, Võ Nguyễn Lê Duy, who provides expert guidance, meticulous editing, and insightful reviews to shape the project's success.
                </p>
              </div>
              <TeamCard member={supervisor} isSupervisor={true} />
            </AnimationWrapper>
          </section>
        )}

        {/* Team Members Section */}
        <section>
          <AnimationWrapper direction="up" delay={0.1}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                Core Team Members
              </h2>
              <p className="text-green-700 text-lg max-w-2xl mx-auto">
                Our talented team members who bring unique skills and perspectives to make this project a success.
              </p>
            </div>
          </AnimationWrapper>
          
          <div className="flex flex-col gap-6">
            {members.map((member, index) => (
              <AnimationWrapper key={index} direction="up" delay={0.1 + index * 0.1}>
                <TeamCard
                  member={member}
                  align={"left"}
                />
              </AnimationWrapper>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <AnimationWrapper direction="up" delay={0.2 + members.length * 0.1}>
          <div className="text-center mt-20 p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Interested in Our Work?
            </h3>
            <p className="text-green-700 mb-6">
              We're always open to collaboration and feedback. Feel free to reach out to any of our team members!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                <a href="https://github.com/PuxHocDL/DropoutDetection" target="_blank" rel="noopener noreferrer" className="flex items-center" onClick={() => window.open("https://github.com/PuxHocDL/DropoutDetection", "_blank")}>
                  View Our Project
                </a>
              </button>
            </div>
          </div>
        </AnimationWrapper>
      </div>
    </div>
  );
};

export default OurTeam;