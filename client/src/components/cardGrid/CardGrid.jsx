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
                    <CardExpanded {...selectedCard}
                    />
                    </div>
                </div>
            )}
        </div>
    );
}
    
            
