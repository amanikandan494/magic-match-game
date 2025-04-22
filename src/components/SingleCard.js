import './SingleCard.css';

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card-container">
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt="card front" />
                <img
                    className='back'
                    src="/img/kerala.jpg"
                    alt="card back"
                    onClick={handleClick} />
            </div>
        </div>
    );
}

export default SingleCard