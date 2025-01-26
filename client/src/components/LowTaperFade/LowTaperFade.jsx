import './LowTaperFade.css';
import { useEffect } from 'react';

export default function LowTaperFade() {
    
    useEffect(() => {
        const handleScroll = () => {
            const element = document.querySelector('.LowTaperFade');
            const scrollPosition = window.innerHeight + window.scrollY;
            const documentHeight = document.body.offsetHeight;
            const fadeStart = documentHeight - window.innerHeight;
            const fadeEnd = documentHeight;

            if (scrollPosition >= fadeStart) {
            const opacity = 1 - (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
            element.style.opacity = opacity;
            } else {
            element.style.opacity = 1;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div className='LowTaperFade'></div>
    )
}