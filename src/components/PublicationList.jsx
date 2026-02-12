import React, { useEffect, useState } from 'react';
import { ExternalLink, Calendar, Users } from 'lucide-react';

const PublicationList = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Determine the base URL for fetching the JSON file
        // In production (GitHub Pages), it might need the repo name if not handled by standard routing
        const baseUrl = import.meta.env.BASE_URL; // e.g., '/damarisbenny/'

        // Construct path to publications.json in public folder
        const jsonPath = `${baseUrl}publications.json`.replace('//', '/');

        fetch(jsonPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load publications');
                }
                return response.json();
            })
            .then(data => {
                setPublications(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching publications:", err);
                // Fallback or empty state
                setPublications([]);
                setLoading(false);
                setError("Could not load publications.");
            });
    }, []);

    // Function to highlight "Damaris Benny" or similar variations in author list
    const highlightAuthor = (authors) => {
        if (!authors) return "";
        // List of variations found in Google Scholar data
        const nameVariations = [
            "Damaris Benny Daniel",
            "Damaris Benny",
            "Damaris Daniel",
            "D. Benny",
            "D Benny",
            "DB Daniel",
            "D B Daniel",
            "D. B. Daniel"
        ];

        // Create a regex that matches any of the variations, case-insensitive
        // We use word boundaries where appropriate, but for initials followed by names, 
        // simple substring matching often works better given the variability.
        // We sort by length descending to match longest variations first.
        const sortedVariations = nameVariations.sort((a, b) => b.length - a.length);
        const regexPattern = `(${sortedVariations.map(v => v.replace('.', '\\.')).join('|')})`;
        const parts = authors.split(new RegExp(regexPattern, 'gi'));

        return (
            <span>
                {parts.map((part, i) =>
                    // Check if this part matches any variation (case-insensitive)
                    sortedVariations.some(v => v.toLowerCase() === part.toLowerCase()) ?
                        <strong key={i} className="text-gray-900 font-bold border-b-2 border-academic-accent/20">{part}</strong> :
                        <span key={i}>{part}</span>
                )}
            </span>
        );
    };

    if (loading) return <div className="p-4 text-gray-500 animate-pulse">Loading publications...</div>;

    if (publications.length === 0) {
        return <div className="p-4 text-gray-500 italic">No publications found or error loading data.</div>;
    }

    return (
        <div className="space-y-6">
            {publications.map((pub, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        {pub.link ? (
                            <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-academic-accent flex items-start gap-2">
                                {pub.title} <ExternalLink size={16} className="mt-1 opacity-50" />
                            </a>
                        ) : (
                            pub.title
                        )}
                    </h4>
                    <div className="text-gray-600 mb-2 text-sm flex items-start">
                        <Users size={16} className="mr-2 mt-0.5 flex-shrink-0 opacity-70" />
                        {highlightAuthor(pub.author)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {pub.publication_year && (
                            <span className="flex items-center">
                                <Calendar size={14} className="mr-1" /> {pub.publication_year}
                            </span>
                        )}
                        {pub.publication_place && (
                            <span className="italic">
                                {pub.publication_place}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PublicationList;
