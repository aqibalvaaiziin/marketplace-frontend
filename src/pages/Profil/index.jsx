import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { UserContext, HOSTNAME } from '../../App';
import axios from 'axios';
import SidebarProfil, { listActiveSidebarItem } from './SidebarProfil';
import { listActiveItem } from './NavPesananSaya';
import UangSaya from './UangSaya';
import AkunSaya from './AkunSaya';
import PesananSayaContainer from './PesananSayaContainer';

function Profil(props) {
	const context = useContext(UserContext);
	let idPengguna;
	const [ pengguna, setPengguna ] = useState();
	const [ loading, setLoading ] = useState(false);

	const [ activeItem, setActiveItem ] = useState(listActiveItem.semua);
	const [ activeSidebarItem, setactiveSidebarItem ] = useState(listActiveSidebarItem.akunSaya);

	const [ kumpulanTransaksi, setKumpulanTransaksi ] = useState([]);
	const [ selectedTransaksi, setselectedTransaksi ] = useState([]);

	function selesai(idTransaksi) {
		axios
			.put(
				`${HOSTNAME}/transaksi/${idTransaksi}/selesai`,
				{},
				{
					headers: { Authorization: `Bearer ${context.token}` }
				}
			)
			.then(() => {
				axios
					.get(`${HOSTNAME}/transaksi`, {
						headers: { Authorization: `Bearer ${context.token}` }
					})
					.then((res) => {
						setKumpulanTransaksi(res.data);
						setActiveItemData(listActiveItem.selesai);
					});
			});
	}

	function setActiveItemData(item) {
		const transactions = kumpulanTransaksi;
		switch (item) {
			case listActiveItem.semua:
				setselectedTransaksi(transactions);
				break;
			case listActiveItem.belumBayar:
				setselectedTransaksi(transactions.filter((transaction) => !transaction.konfirmasi));
				break;
			case listActiveItem.dikemas:
				setselectedTransaksi(
					transactions.filter((transaction) => transaction.konfirmasi && !transaction.kirim)
				);
				break;
			case listActiveItem.dikirim:
				setselectedTransaksi(transactions.filter((transaction) => transaction.kirim && !transaction.selesai));
				break;
			case listActiveItem.selesai:
				setselectedTransaksi(transactions.filter((transaction) => transaction.selesai));
				break;
		}
		setActiveItem(item);
	}

	useEffect(() => {
		setLoading(true);
		if (!props.location.state) {
			if (context.getPengguna()) {
				idPengguna = context.getPengguna().id_pengguna;
				axios.get(`${HOSTNAME}/pengguna/${idPengguna}`).then((res) => {
					setPengguna(res.data);
					axios
						.get(`${HOSTNAME}/transaksi`, {
							headers: { Authorization: `Bearer ${context.token}` }
						})
						.then((res) => {
							setKumpulanTransaksi(res.data);
							setselectedTransaksi(res.data);
							setLoading(false);
						});
				});
			} else {
				props.history.push('/');
			}
		} else {
			axios.get(`${HOSTNAME}/pengguna/${props.location.state.id_pengguna}`).then((res) => {
				setPengguna(res.data);
				setLoading(false);
			});
		}
	}, []);
	return (
		<Container style={(styles.marginSide, styles.paddingContainer)}>
			{pengguna &&
			!loading && (
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={3}>
							<SidebarProfil
								pengguna={pengguna}
								setActiveItem={setactiveSidebarItem}
								activeItem={activeSidebarItem}
							/>
						</Grid.Column>
						<Grid.Column width={13}>
							{activeSidebarItem === listActiveSidebarItem.akunSaya && <AkunSaya pengguna={pengguna} />}
							{activeSidebarItem === listActiveSidebarItem.pesananSaya && (
								<PesananSayaContainer
									kumpulanTransaksi={selectedTransaksi}
									setActiveItem={setActiveItemData}
									activeItem={activeItem}
									listActiveItem={listActiveItem}
									selesai={selesai}
									history={props.history}
								/>
							)}
							{activeSidebarItem === listActiveSidebarItem.uangSaya && <UangSaya />}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			)}
		</Container>
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
export default Profil;
