import { useState } from "react";
import { shortList, list, longList } from "./data";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";

const Carousel = () => {
  const [people, setPeople] = useState(longList);
  const [currentPerson, setCurrentPerson] = useState(0);

  const prevSlide = () => {
    let newPerson = (currentPerson - 1 + people.length) % people.length;

    return setCurrentPerson(newPerson);
  };
  const nextSlide = () => {
    let newPerson = (currentPerson + 1) % people.length;

    return setCurrentPerson(newPerson);
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(sliderId);
    };
  }, [currentPerson]);

  return (
    <section className="slider-container">
      {people.map((person, index) => {
        const { id, image, name, title, quote } = person;

        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translateX(${100 * (index - currentPerson)}%)`,
              opacity: index === currentPerson ? 1 : 0,
              visibility: index === currentPerson ? `visible` : `hidden`,
            }}>
            <img src={image} alt={name} className="person-img" />
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon" />
          </article>
        );
      })}
      <button type="button" className="prev" onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};
export default Carousel;
