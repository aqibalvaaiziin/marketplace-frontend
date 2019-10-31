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
				<Grid columns={3} style={styles.marginGrid}>
					<Grid.Row>
						<Grid.Column width={3} />
						<Grid.Column width={10} textAlign="center">
							<Grid columns={2}>
								<Grid.Row>
									<Grid.Column width={8}>
										<Segment style={styles.marginSegment}>
											<Icon name="reply" size="huge" />
											<Icon name="dollar sign" size="huge" />
											<Header as="h3">Penarikan</Header>
										</Segment>
									</Grid.Column>
									<Grid.Column width={8}>
										<Segment style={styles.marginSegment}>
											<Icon name="dollar sign" size="huge" />
											<Icon name="share" size="huge" />
											<Header as="h3">Transaksi</Header>
										</Segment>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Grid.Column>
						<Grid.Column width={3} />
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
	},
	marginSegment: {
		paddingTop: '50px',
		paddingBottom: '50px'
	}
};
export default UangSaya;
