import React from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';

function PesananBarangItem() {
	return (
		<Grid.Row>
			<Grid.Column width={2}>
				<Image src="https://placeimg.com/120/120/any" size="tiny" />
			</Grid.Column>
			<Grid.Column width={11}>
				<Header as="h5" style={{ marginBottom: '7px' }}>
					Nama Barang
				</Header>
				<span>x1</span>
			</Grid.Column>
			<Grid.Column width={3}>
				<Header as="h5">Rp. 200.000</Header>
			</Grid.Column>
		</Grid.Row>
	);
}

export default PesananBarangItem;
