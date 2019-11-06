import React, { useState, useContext } from 'react';
import { Container, Segment, Grid, Header, Icon, Table, TableCell, Accordion, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import { HOSTNAME, UserContext } from '../../App';

function CardLogTransaksiUsaha(props) {
	const context = useContext(UserContext);
	const [ activeIndex, setActiveIndex ] = useState(null);
	const [ resi, setResi ] = useState('');
	console.log(props);

	function handleClick(event, titleProps) {
		const { index } = titleProps;
		const newIndex = activeIndex === index ? -1 : index;
		setActiveIndex(newIndex);
	}
	return (
		<Container>
			<Segment style={styles.verticalSpace}>
				<Header as="h2">Pembeli : {props.transaksi.pengguna.nama}</Header>
				<Grid columns={2} celled verticalAlign="middle" textAlign="center">
					<Grid.Column width={11} textAlign="left">
						<Header size="medium">
							<Icon name="file alternate outline" />
							<Header.Content style={styles.h2}>
								{props.transaksi.id_transaksi}
								<Header.Subheader>{props.time}</Header.Subheader>
							</Header.Content>
						</Header>
					</Grid.Column>
					<Grid.Column width={5}>
						<Header size="huge">
							<Header.Content>
								<Header.Subheader>Total Transaksi :</Header.Subheader>
								Rp.{props.transaksi.total_harga +
									props.transaksi.ongkir -
									props.transaksi.profit_koperasi}
							</Header.Content>
						</Header>
					</Grid.Column>
				</Grid>
				<Table celled textAlign="center">
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Nama Produk</Table.HeaderCell>
							<Table.HeaderCell>Jumlah Produk</Table.HeaderCell>
							<Table.HeaderCell>Berat Produk</Table.HeaderCell>
							<Table.HeaderCell>Subtotal</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{props.transaksi.detail_transaksis.map((detail) => (
							<Table.Row key={detail.id_detiltransaksi}>
								<TableCell>{detail.produk.nama}</TableCell>
								<TableCell>{detail.jumlah}</TableCell>
								<TableCell>{detail.berat}</TableCell>
								<TableCell>{detail.subtotal}</TableCell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Accordion fluid styled>
					<Accordion.Title active={activeIndex === 0} index={0} onClick={handleClick}>
						<Icon name="dropdown" />
						Alamat Pengiriman
					</Accordion.Title>
					<Accordion.Content active={activeIndex === 0}>
						<Header as="h4">Alamat pengiriman pembeli : {props.transaksi.detail_alamat}</Header>
					</Accordion.Content>
					<Accordion.Title active={activeIndex === 1} index={1} onClick={handleClick}>
						<Icon name="dropdown" />
						Pengiriman
					</Accordion.Title>
					{props.transaksi.kirim ? (
						<Accordion.Content active={activeIndex === 1}>
							<Header as="h4">No. Resi : {props.transaksi.no_resi}</Header>
						</Accordion.Content>
					) : (
						<Accordion.Content active={activeIndex === 1}>
							<Header as="h3">No. Resi</Header>
							<Grid columns={2}>
								<Grid.Row>
									<Grid.Column width={10}>
										<Input fluid onChange={(e) => setResi(e.target.value)} />
									</Grid.Column>
									<Grid.Column width={6} textAlign="center">
										<Button
											color="green"
											content="Input Resi"
											size="medium"
											onClick={(e) => props.kirimResi(props.transaksi.id_transaksi, resi)}
										/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Accordion.Content>
					)}
				</Accordion>
			</Segment>
		</Container>
	);
}

export default CardLogTransaksiUsaha;

const styles = {
	verticalSpace: {
		marginBottom: 20
	},
	h2: {
		padding: 10
	}
};
