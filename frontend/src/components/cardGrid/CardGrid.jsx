import './CardGrid.css'
import Card from '../card/Card.jsx'
import PFP from '../../assets/UserPhoto.png'
import { useState } from 'react';
import React from 'react';
import CardExpanded from '../cardExpanded/cardExpanded.jsx';
export default function CardGrid(){
    const [selectedCard, setSelectedCard] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cards = [
        {
            img: PFP,
            name: "Nath Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
        {
            img: PFP,
            name: "Nate Gelfand",
            pronouns: "He/Him/His",
            description: "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin it and eating watermelons",
            major: "Computer Science",
            class: "2025",
            sleepSchedule: "Night Owl",
            usingMyStuff: "Open to sharing",
            extraversionFill: "3",
            cleanlinessFill: "2",
        },
    ];

    
    const handleCardClick = (cardData) => {
        setSelectedCard(cardData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };

    return (
        <div className="CardGrid">
            <div className={`GridWrapper ${isModalOpen ? 'blur-background' : ''}`}> 
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        img={card.img}
                        name={card.name}
                        pronouns={card.pronouns}
                        description={card.description}
                        major={card.major}
                        class={card.class}
                        onClick={() => handleCardClick(card)}
                    />
                ))}
            </div>
            
        {isModalOpen && selectedCard && (
                <div className="modal-background" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
                    >
                    <CardExpanded {...selectedCard}
                    />
                    </div>
                </div>
            )}
        </div>
    );
}
    
            
