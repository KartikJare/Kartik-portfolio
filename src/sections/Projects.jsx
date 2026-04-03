import { motion } from "framer-motion";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

const projects = [
  {
    title: "Concurrent FTP Server",
    description: "Multi-client FTP server using C socket programming",
    details: ["Handles multiple clients", "File transfer using sockets"],
    tech: ["C"],
    github: "https://github.com/KartikJare/Concurrent_FTP_Server",
  },
  {
    title: "EduTrack – Classroom & Student Management Portal",
    description: "Backend system for managing students, batches, and classroom operations",
    details: [
      "Developed backend services for managing student records and batch operations",
      "Implemented RESTful CRUD APIs with NoSQL database integration",
      "Designed modular architecture for scalability and maintainability"
    ],
    tech: ["Java", "Spring Boot", "MongoDB", "REST APIs"],
    github: "https://github.com/KartikJare/Edu-Track-Classroom-Student-Management-Portal-",
  },
  {
    title: "File Packer & Unpacker with Encryption",
    description: "Secure file archiving tool with encryption and GUI support",
    details: [
      "Developed secure file archiving system with encryption and metadata preservation",
      "Designed GUI interface using Swing"
    ],
    tech: ["Java", "Cryptography"],
    github: "https://github.com/KartikJare/File-Packer-Unpacker-with-Encryption-CUI-GUI",
  },
  {
    title: "Chat Messenger with Log Facility",
    description: "Real-time chat application with logging using sockets",
    details: [
      "Implemented real-time messaging system using TCP sockets",
      "Maintained timestamp-based chat logging mechanism"
    ],
    tech: ["Java", "Socket Programming"],
    github: "https://github.com/KartikJare/Chat-Messenger-with-Log-Facility",
  },
  {
    title: "Customised Virtual File System (CVFS)",
    description: "Linux-like virtual file system with custom commands",
    details: [
      "Simulated Linux-like file system operations using custom shell commands",
      "Implemented inode-based internal architecture and file handling operations"
    ],
    tech: ["C","Operating System Concepts"],
    github: "https://github.com/KartikJare/Customised-Virtual-File-System-CVFS-",
  },
  {
    title: "Generalised Data Structures Library",
    description: "Reusable library of data structures using C++ templates",
    details: [
      "Developed reusable implementations of linear and non-linear data structures using templates"
    ],
    tech: ["C++"],
    github: "https://github.com/KartikJare/Generalised-Data-Structures-Library",
  },
  {
    title: "Marvellous Study Tracker App",
    description: "Console-based app to track study activities with export support",
    details: [
      "Developed console-based study activity tracker with CSV export functionality"
    ],
    tech: ["Java"],
    github: "https://github.com/KartikJare/Marvellous-Study-Tracker-App-CUI-GUI",
  },
  {
    title: "Kernel Interface Utility Suite",
    description: "System utilities for monitoring processes via Linux /proc",
    details: [
      "Developed utilities to monitor processes and system resources using /proc filesystem"
    ],
    tech: ["C", "Linux System Programming"],
    github: "https://github.com/KartikJare/Kernel_Interface_Utility_Suite",
  },
];

  return (
    <section 
    id="projects"
    className="min-h-screen bg-black text-white py-20 px-6">
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
      >
        My Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-cyan-400 transition p-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: i * 0.1, 
            }}
        
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <a
          href="https://github.com/KartikJare"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-xl 
          hover:bg-white/20 transition-all duration-300 
          flex flex-col items-center text-center shadow-lg"
        >
          <p className="text-sm text-white/70">Want to see more?</p>
          <p className="text-lg font-semibold">Visit My GitHub 🚀</p>
        </a>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            className="bg-[#0f172a] rounded-2xl max-w-xl w-full p-6 relative"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-bold">
              {selectedProject.title}
            </h2>

            <p className="text-gray-400 mt-2">
              {selectedProject.description}
            </p>

            <ul className="mt-4 space-y-2 text-gray-300">
              {selectedProject.details.map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 mt-4">
              {selectedProject.tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href={selectedProject.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block bg-white text-black px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              View Code on GitHub
            </a>
          </motion.div>
        </div>
      )}
    </section>
  );
}