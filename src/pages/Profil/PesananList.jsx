import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import PesananItem from './PesananItem';

function PesananList() {
	return (
		<Container>
			<Segment>
				<PesananItem />
			</Segment>
		</Container>
	);
}

export default PesananList;
