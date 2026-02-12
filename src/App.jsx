import React, { useState, useEffect } from 'react';
import { Mail, Github, BookOpen, GraduationCap, Link as LinkIcon, FileText, User } from 'lucide-react';
import PublicationList from './components/PublicationList';
import profile from './data/profile.json';

function App() {
    const [activeSection, setActiveSection] = useState('home');

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-academic-blue text-white md:h-screen md:fixed flex flex-col justify-between p-6 z-10">
                <div>
                    <div className="mb-6">
                        <img
                            src={profile.basics.avatar}
                            alt={profile.basics.name}
                            className="w-32 h-32 rounded-full border-4 border-blue-400/30 shadow-lg object-cover mx-auto md:mx-0"
                        />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">{profile.basics.name}</h1>
                    <p className="text-blue-200 text-sm mb-8">{profile.basics.role}<br />{profile.basics.focus}</p>

                    <nav className="space-y-4">
                        {['home', 'research', 'publications', 'roles', 'contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`block w-full text-left capitalize hover:text-blue-300 transition-colors ${activeSection === item ? 'text-blue-300 font-semibold' : ''}`}
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-8 md:mt-0 flex space-x-4">
                    <a href={profile.basics.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <Github size={20} />
                    </a>
                    <a href={profile.basics.scholar_url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <GraduationCap size={20} />
                    </a>
                    <a href={`mailto:${profile.basics.email_uib}`} className="hover:text-blue-300">
                        <Mail size={20} />
                    </a>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 md:p-12 lg:p-20 max-w-4xl mx-auto">

                {/* Home / About */}
                <section id="home" className="mb-20 pt-10 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <User className="mr-3 text-academic-accent" /> About Me
                    </h2>
                    <div className="prose prose-slate lg:prose-lg text-gray-700">
                        {profile.about.map((paragraph, index) => (
                            <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        ))}
                        {/* Note: In real app, might want a markdown parser, but simple replacement or just passing text is fine. 
                 The JSON has plain text. I'll render it as text for safety, or if I want bolding I need to handle it.
                 Current JSON is plain text strings. I'll just render them. 
              */}
                    </div>
                </section>

                {/* Research */}
                <section id="research" className="mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <BookOpen className="mr-3 text-academic-accent" /> Research Interests
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        {profile.research_interests.map((interest, index) => (
                            <div key={index} className="mb-4 last:mb-0">
                                <h3 className="text-xl font-semibold mb-2 text-academic-blue">{interest.title}</h3>
                                <p className="text-gray-700">{interest.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Publications */}
                <section id="publications" className="mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <FileText className="mr-3 text-academic-accent" /> Publications
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
                        Automatically updated from Google Scholar.
                    </p>
                    <PublicationList />
                </section>

                {/* Roles & Service */}
                <section id="roles" className="mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <GraduationCap className="mr-3 text-academic-accent" /> Roles & Service
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Academic Service</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                {profile.service.academic.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Teaching</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                {profile.service.teaching.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section id="contact" className="mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <Mail className="mr-3 text-academic-accent" /> Contact
                    </h2>
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="w-5 h-5 text-gray-500 mr-3" />
                                <a href={`mailto:${profile.basics.email_uib}`} className="text-academic-accent hover:underline">{profile.basics.email_uib}</a>
                                <span className="mx-2 text-gray-400">|</span>
                                <a href={`mailto:${profile.basics.email_personal}`} className="text-academic-accent hover:underline">{profile.basics.email_personal}</a>
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="w-5 h-5 text-gray-500 mr-3" />
                                <a href={profile.basics.scholar_url} target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline">Google Scholar Profile</a>
                            </div>
                            <div className="flex items-center">
                                <Github className="w-5 h-5 text-gray-500 mr-3" />
                                <a href={profile.basics.github_url} target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline">github.com/{profile.basics.github_url.split('/').pop()}</a>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default App;
