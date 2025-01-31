import { Component, ReactNode } from 'react';
import { CardProps } from '../../utils/interfaces';
import './Card.css';

class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <section className="card-container">
        <h2>{this.props.title}</h2>
        <p className="card-container__description">{this.props.description}</p>
      </section>
    );
  }
}

export default Card;
