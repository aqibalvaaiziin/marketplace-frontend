import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react';
import Card from '../../components/CardProduct/CardProduct';

export default class Home extends Component {
    render() {
        return (
            <Fragment>
                <Container>
                    <Grid columns={4} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Card name="Sunlight" price="25000" />
                            </Grid.Column>
                            <Grid.Column>
                                <Card name="Rinso" price="35000" />
                            </Grid.Column>
                            <Grid.Column>
                                <Card name="Sari Roti" price="28000" />
                            </Grid.Column>
                            <Grid.Column>
                                <Card name="Indomie" price="30000" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Container>
            </Fragment>
        )
    }
}
