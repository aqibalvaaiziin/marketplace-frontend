import React from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import PesananBarangList from './PesananBarangList';

function PesananItem() {
	return (
		<React.Fragment>
			<div style={{ marginLeft: '20px' }}>
				<Grid columns={2}>
					<Grid.Column width={8} floated="left">
						<Header as="h3">Nama Usaha</Header>
					</Grid.Column>
					<Grid.Column width={8} floated="right">
						<Header as="h3" textAlign="right" style={{ marginRight: '20px' }}>
							No Resi : 123456744343
						</Header>
					</Grid.Column>
				</Grid>
				<Grid columns={3}>
					<PesananBarangList />
					<Grid.Row>
						<Grid.Column width={7} floated="right">
							<Grid columns={2}>
								<Grid.Column width={6} floated="left">
									<Header as="h5">Total Pesanan</Header>
								</Grid.Column>
								<Grid.Column width={7} floated="right">
									<Header as="h5">Rp. 400.000</Header>
								</Grid.Column>
							</Grid>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={8} floated="right">
							<Grid columns={2}>
								<Grid.Column width={7} floated="right">
									<Button color="yellow">
										<p>Beri Rating</p>
									</Button>
								</Grid.Column>
							</Grid>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		</React.Fragment>
	);
}

export default PesananItem;
