import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';
import PesananBarangItem from './PesananBarangItem';

function PesananBarangList() {
	return (
		<React.Fragment>
			<PesananBarangItem />
			<PesananBarangItem />
		</React.Fragment>
	);
}

export default PesananBarangList;
