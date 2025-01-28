import { Component, ReactNode } from 'react';
import { CardProps } from '../../utils/interfaces';

class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <>
        <h2>{this.props.title}</h2>
        <p>{this.props.description}</p>
      </>
    );
  }
}

export default Card;
