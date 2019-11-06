import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import NavPesananSaya from './NavPesananSaya';
import CardLogPesanan from './CardLogPesanan';

function PesananSayaContainer(props) {
	return (
		<div>
			<NavPesananSaya setActiveItem={props.setActiveItem} activeItem={props.activeItem} />
			{props.kumpulanTransaksi.length ? (
				props.kumpulanTransaksi.map((transaksi) => {
					const dateTime = new Date(transaksi.createdAt);
					const date = dateTime.getDate();
					const month = dateTime.getMonth() + 1;
					const year = dateTime.getFullYear();
					const hour = dateTime.getHours();
					const minutes = dateTime.getMinutes();

					return (
						<Container style={styles.marginCard} key={transaksi.id_transaksi}>
							{props.activeItem === props.listActiveItem.semua && (
								<CardLogPesanan
									transaksi={transaksi}
									tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
									onDetailButtonClick={() =>
										props.history.push({
											pathname: '/transaksi/detail',
											state: transaksi.id_transaksi
										})}
									history={props.history}
									selesai={props.selesai}
								/>
							)}
							{props.activeItem === props.listActiveItem.belumBayar && (
								<CardLogPesanan
									transaksi={transaksi}
									tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
									onDetailButtonClick={() =>
										props.history.push({
											pathname: '/transaksi/detail',
											state: transaksi.id_transaksi
										})}
									history={props.history}
									selesai={props.selesai}
								/>
							)}
							{props.activeItem === props.listActiveItem.dikemas && (
								<CardLogPesanan
									transaksi={transaksi}
									tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
									onDetailButtonClick={() =>
										props.history.push({
											pathname: '/transaksi/detail',
											state: transaksi.id_transaksi
										})}
									history={props.history}
									selesai={props.selesai}
								/>
							)}
							{props.activeItem === props.listActiveItem.dikirim && (
								<CardLogPesanan
									transaksi={transaksi}
									tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
									onDetailButtonClick={() =>
										props.history.push({
											pathname: '/transaksi/detail',
											state: transaksi.id_transaksi
										})}
									history={props.history}
									selesai={props.selesai}
								/>
							)}
							{props.activeItem === props.listActiveItem.selesai && (
								<CardLogPesanan
									transaksi={transaksi}
									tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
									onDetailButtonClick={() =>
										props.history.push({
											pathname: '/transaksi/detail',
											state: transaksi.id_transaksi
										})}
									history={props.history}
								/>
							)}
						</Container>
					);
				})
			) : (
				<Container style={styles.marginCard}>
					<Header as="h2">Transaksi Kosong</Header>
				</Container>
			)}
		</div>
	);
}

const styles = {
	cardRow: {
		marginTop: 15
	},
	marginSide: {
		marginTop: 15
	},
	noMargin: {
		marginTop: '0'
	},
	paddingContainer: {
		padding: 14
	}
};

export default PesananSayaContainer;
