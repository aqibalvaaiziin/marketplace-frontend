import React from 'react';
import { Container, Segment, Header, Grid, Icon } from 'semantic-ui-react';

function UangSaya() {
	return (
		<Container>
			<Segment>
				<Header as="h2" textAlign="center" style={styles.marginHeader}>
					Total
				</Header>
				<Header as="h2" textAlign="center">
					Rp. 780999
				</Header>
				<Grid columns={2} style={styles.marginGrid}>
					<Grid.Row>
						<Grid.Column width={8} textAlign="center">
							<Icon name="reply" size="huge" />
							<Icon name="dollar sign" size="huge" />
							<Header as="h3">Penarikan</Header>
						</Grid.Column>
						<Grid.Column width={8} textAlign="center">
							<Icon name="dollar sign" size="huge" />
							<Icon name="share" size="huge" />
							<Header as="h3">Transaksi</Header>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Segment>
		</Container>
	);
}

const styles = {
	marginHeader: {
		marginTop: '30px'
	},
	marginGrid: {
		marginTop: '80px',
		marginBottom: '200px'
	}
};
export default UangSaya;
