import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';

export const listActiveItem = {
	semua: 'Semua',
	belumBayar: 'Belum Bayar',
	dikemas: 'Dikemas',
	dikirim: 'Dikirim',
	selesai: 'Selesai',
	dibatalkan: 'Dibatalkan'
};

function Nav(props) {
	return (
		<Menu pointing secondary widths={6}>
			<Menu.Item
				name="Semua"
				active={props.activeItem == listActiveItem.semua}
				onClick={(event) => props.setActiveItem(listActiveItem.semua)}
			/>
			<Menu.Item
				name="Belum Bayar"
				active={props.activeItem == listActiveItem.belumBayar}
				onClick={(event) => props.setActiveItem(listActiveItem.belumBayar)}
			/>
			<Menu.Item
				name="Dikemas"
				active={props.activeItem == listActiveItem.dikemas}
				onClick={(event) => props.setActiveItem(listActiveItem.dikemas)}
			/>
			<Menu.Item
				name="Dikirim"
				active={props.activeItem == listActiveItem.dikirim}
				onClick={(event) => props.setActiveItem(listActiveItem.dikirim)}
			/>
			<Menu.Item
				name="Selesai"
				active={props.activeItem == listActiveItem.selesai}
				onClick={(event) => props.setActiveItem(listActiveItem.selesai)}
			/>
			<Menu.Item
				name="Dibatalkan"
				active={props.activeItem == listActiveItem.dibatalkan}
				onClick={(event) => props.setActiveItem(listActiveItem.dibatalkan)}
			/>
		</Menu>
	);
}

export default Nav;
