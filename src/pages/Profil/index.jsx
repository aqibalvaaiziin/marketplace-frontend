import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { UserContext } from '../../App';
import axios from 'axios';
import SidebarProfil, { listActiveSidebarItem } from './SidebarProfil';
import Nav, { listActiveItem } from './Nav';
import PesananList from './PesananList';
import UangSaya from './UangSaya';
import AkunSaya from './AkunSaya';

function Profil(props) {
	const context = useContext(UserContext);
	let idPengguna;
	const [ pengguna, setPengguna ] = useState();
	const [ loading, setLoading ] = useState(false);

	const [ activeItem, setActiveItem ] = useState(listActiveItem.semua);
	const [ activeSidebarItem, setactiveSidebarItem ] = useState(listActiveSidebarItem.akunSaya);

	useEffect(() => {
		setLoading(false);
		if (!props.location.state) {
			if (context.getPengguna()) {
				idPengguna = context.getPengguna().id_pengguna;
				axios.get(`http://localhost:8000/pengguna/${idPengguna}`).then((res) => {
					setPengguna(res.data);
					setLoading(true);
				});
			} else {
				props.history.push('/');
			}
		} else {
			axios
				.get(`http://localhost:8000/pengguna/${props.location.state.id_pengguna}`)
				.then((res) => setPengguna(res.data));
			setLoading(true);
		}
	}, []);
	return (
		<Container style={(styles.marginSide, styles.paddingContainer)}>
			{pengguna &&
			loading && (
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={3}>
							<SidebarProfil setActiveItem={setactiveSidebarItem} activeItem={activeSidebarItem} />
						</Grid.Column>
						<Grid.Column width={13}>
							{activeSidebarItem === listActiveSidebarItem.akunSaya && <AkunSaya />}
							{activeSidebarItem === listActiveSidebarItem.pesananSaya && [
								<Nav setActiveItem={setActiveItem} activeItem={activeItem} />,
								activeItem === listActiveItem.semua && <PesananList />,
								activeItem === listActiveItem.belumBayar && <PesananList />
							]}
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
