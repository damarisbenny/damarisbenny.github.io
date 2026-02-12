import React, { useState, useEffect } from 'react';
import { Mail, Github, BookOpen, GraduationCap, Link as LinkIcon, FileText, User } from 'lucide-react';
import PublicationList from './components/PublicationList';

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
                    <h1 className="text-2xl font-bold mb-2">Damaris Benny</h1>
                    <p className="text-blue-200 text-sm mb-8">Postdoctoral Researcher<br />Toxicology & Microplastics</p>

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
                    <a href="https://github.com/damarisbenny" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <Github size={20} />
                    </a>
                    <a href="https://scholar.google.com/citations?user=uZXXYEIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <GraduationCap size={20} />
                    </a>
                    <a href="mailto:Damaris.Daniel@uib.no" className="hover:text-blue-300">
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
                        <p className="mb-4">
                            I am a <strong>Postdoctoral Researcher</strong> at the <strong>Department of Clinical Medicine, University of Bergen, Norway</strong>.
                        </p>
                        <p className="mb-4">
                            My research focuses on the intersection of <strong>Toxicology</strong> and <strong>Microplastics</strong>, specifically investigating their impact on human health. I am dedicated to understanding how environmental contaminants affect biological systems and contributing to the scientific understanding of plastic pollution.
                        </p>
                    </div>
                </section>

                {/* Research */}
                <section id="research" className="mb-20 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                        <BookOpen className="mr-3 text-academic-accent" /> Research Interests
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-semibold mb-3 text-academic-blue">Microplastics & Human Health</h3>
                        <p className="text-gray-700 mb-4">
                            Investigating the presence, transport, and toxicological effects of microplastics in human tissues and fluids.
                        </p>
                        <h3 className="text-xl font-semibold mb-3 text-academic-blue">Toxicology</h3>
                        <p className="text-gray-700">
                            Assessing the impacts of environmental pollutants on cellular health and physiological functions.
                        </p>
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
                                <li>Reviewer for international toxicology journals</li>
                                <li>Conference organization committee member</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Teaching</h3>
                            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                                <li>Lecturer in Environmental Toxicology</li>
                                <li>Supervisor for Master's students</li>
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
                                <a href="mailto:Damaris.Daniel@uib.no" className="text-academic-accent hover:underline">Damaris.Daniel@uib.no</a>
                                <span className="mx-2 text-gray-400">|</span>
                                <a href="mailto:damarisbenny@gmail.com" className="text-academic-accent hover:underline">damarisbenny@gmail.com</a>
                            </div>
                            <div className="flex items-center">
                                <GraduationCap className="w-5 h-5 text-gray-500 mr-3" />
                                <a href="https://scholar.google.com/citations?user=uZXXYEIAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline">Google Scholar Profile</a>
                            </div>
                            <div className="flex items-center">
                                <Github className="w-5 h-5 text-gray-500 mr-3" />
                                <a href="https://github.com/damarisbenny" target="_blank" rel="noopener noreferrer" className="text-academic-accent hover:underline">github.com/damarisbenny</a>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default App;
