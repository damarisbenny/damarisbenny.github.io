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
        const nameVariations = ["D Benny", "D. Benny", "Damaris Benny", "D Daniel", "Damaris Daniel"];

        // Simple bolding approach (Note: real Google Scholar data is just a string usually)
        // We'll wrap the known name in <strong> tags if we were parsing HTML, but here we render text.
        // Since we receive a string, we can try to split and preserve.

        // However, simplest React way for a substring match:
        // Regex based simple replacement for display
        const parts = authors.split(new RegExp(`(${nameVariations.join('|')})`, 'gi'));

        return (
            <span>
                {parts.map((part, i) =>
                    nameVariations.some(v => v.toLowerCase() === part.toLowerCase()) ?
                        <strong key={i} className="text-gray-900 border-b-2 border-academic-accent/20">{part}</strong> :
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
