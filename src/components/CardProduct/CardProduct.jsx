import React, { Component, Fragment } from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

class CardProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Fragment>

                <Card>
                    <Image src="https://placeimg.com/250/200/tech" />
                    <Card.Content>
                        <Card.Header>{this.props.name}</Card.Header>
                        <Card.Description>Rp.{this.props.price}</Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <Button primary fluid><Icon name="shopping cart" />Add to Chart</Button>
                    </Card.Content>
                </Card>

            </Fragment>
        );
    }
}

export default CardProduct;