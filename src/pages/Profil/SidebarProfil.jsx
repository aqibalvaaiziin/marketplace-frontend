import React from 'react';
import { Grid, Image, Header, List, Segment, Divider, Menu } from 'semantic-ui-react';

export const listActiveSidebarItem = {
	akunSaya: 'Akun Saya',
	pesananSaya: 'Pesanan Saya',
	uangSaya: 'Uang Saya'
};

function SidebarProfil(props) {
	return (
		<Segment>
			<Grid columns={2}>
				<Grid.Row verticalAlign="middle">
					<Grid.Column width={5}>
						<Image src="https://placeimg.com/120/120/any" fluid />
					</Grid.Column>
					<Grid.Column width={11}>
						<Header size="small" style={{ marginBottom: '0' }}>
							Daffa
						</Header>
						<br />
						<Header size="tiny" style={{ marginTop: '0' }}>
							(anggota)
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Divider />
			<Grid style={styles.paddingMenu}>
				<Menu secondary vertical>
					<Menu.Item
						name="Akun Saya"
						active={props.activeItem == listActiveSidebarItem.akunSaya}
						onClick={(event) => props.setActiveItem(listActiveSidebarItem.akunSaya)}
					/>
					<Menu.Item
						name="Pesanan Saya"
						active={props.activeItem == listActiveSidebarItem.pesananSaya}
						onClick={(event) => props.setActiveItem(listActiveSidebarItem.pesananSaya)}
					/>
					<Menu.Item
						name="Uang Saya"
						active={props.activeItem == listActiveSidebarItem.uangSaya}
						onClick={(event) => props.setActiveItem(listActiveSidebarItem.uangSaya)}
					/>
				</Menu>
			</Grid>
		</Segment>
	);
}
const styles = {
	paddingMenu: {
		padding: '10px'
	}
};
export default SidebarProfil;
