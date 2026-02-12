import json
import os
from scholarly import scholarly

AUTHOR_ID = 'uZXXYEIAAAAJ'
OUTPUT_FILE = 'public/publications.json'

def fetch_publications():
    print(f"Fetching publications for author ID: {AUTHOR_ID}")
    try:
        author = scholarly.search_author_id(AUTHOR_ID)
        scholarly.fill(author, sections=['publications'])
        
        publications = []
        for pub in author['publications']:
            try:
                # Fill the publication to get detailed info including authors
                scholarly.fill(pub)
                
                bib = pub.get('bib', {})
                
                # Create a clean dictionary
                clean_pub = {
                    'title': bib.get('title', 'Untitled'),
                    'author': bib.get('author', 'Unknown'),
                    'publication_year': bib.get('pub_year', ''),
                    'publication_place': bib.get('venue', ''),
                    # Construct a link if possible (Scholar doesn't always give direct PDF links easily without deep scraping)
                    # We can link to the scholar citation page for the article
                    'link': f"https://scholar.google.com/citations?view_op=view_citation&hl=en&user={AUTHOR_ID}&citation_for_view={pub.get('author_pub_id','')}"
                }
                publications.append(clean_pub)
                print(f"Processed: {clean_pub['title'][:30]}...")
            except Exception as e:
                print(f"Error processing publication: {e}")
        
        # Sort by year descending
        publications.sort(key=lambda x: x['publication_year'], reverse=True)
        
        # Ensure output directory exists (it should, but good practice)
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(publications, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully saved {len(publications)} publications to {OUTPUT_FILE}")

    except Exception as e:
        print(f"An error occurred: {e}")
        # We don't want to break the build/action if scholar fails, just log it.
        # But for the first run, maybe we do want to know.

if __name__ == "__main__":
    fetch_publications()
