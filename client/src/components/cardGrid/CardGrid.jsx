import './CardGrid.css'
import Card from '../card/Card.jsx'
import PFP from '../../assets/UserPhoto.png'
import { useState, useEffect } from 'react'
import React from 'react';
import CardExpanded from '../cardExpanded/cardExpanded.jsx';
export default function CardGrid(){
    const [selectedCard, setSelectedCard] = useState(null);
    const [cards, setCards] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5174/getCards/cards', {
            method: 'GET',
            credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            console.log('Fetched data:', data);
            setCards(data);
        })
          .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    
    const handleCardClick = (cardData) => {
        setSelectedCard(cardData);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCard(null);
        setIsModalOpen(false);
    };
    const extraversionLevels = {
        none: 0,
        low: 1,
        average: 2,
        'above-average': 3,
        high: 4
    };
    
    const cleanlinessLevels = {
        none: 0,
        low: 1,
        average: 2,
        'above-average': 3,
        high: 4
    };
    

    return (
        <div className="CardGrid">
            <div className={`GridWrapper ${isModalOpen ? 'blur-background' : ''}`}> 
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        img={card.img}
                        name={card.user_info && card.user_info.display_name ? card.user_info.display_name : card.first_name + " " + card.last_name}
                        pronouns={card.user_info.pronouns}
                        description={card.user_info.description}
                        major={card.user_info.major}
                        class={card.user_info.grad}
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
                        <CardExpanded
                            img={selectedCard.img}
                            name={selectedCard.user_info && selectedCard.user_info.display_name ? selectedCard.user_info.display_name : selectedCard.first_name + " " + selectedCard.last_name}
                            pronouns={selectedCard.user_info.pronouns}
                            description={selectedCard.user_info.description}
                            major={selectedCard.user_info.major}
                            class={selectedCard.user_info.grad}
                            email={selectedCard.user_info.email}
                            password={selectedCard.user_info.passwordToPass}
                            placeOrigin={selectedCard.user_info.placeOrigin}
                            extraversion={extraversionLevels[selectedCard.user_info.extraversion]}
                            cleanliness={cleanlinessLevels[selectedCard.user_info.cleanliness]}
                            usingMyStuff={selectedCard.user_info.using_my_stuff}
                            startTime={selectedCard.user_info.start_time}
                            endTime={selectedCard.user_info.end_time}
                            
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
    
            
