import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Menu, Button, Container, Grid, Segment } from 'semantic-ui-react';
import { UserContext } from '../../App';

export const listActiveItem = {
	pesananSaya: 'Pesanan Saya',
	produkSaya: 'Produk Saya',
	tambahProduk: 'Tambah Produk',
	penghasilanSaya: 'Penghasilan Saya',
	saldoSaya: 'Saldo Saya'
};
function SidebarDashboardUsaha(props) {
	const context = useContext(UserContext);

	function tambahProduk() {
		props.history.push('/tambahproduk');
	}

  return (
    <Menu vertical fluid>
      <Menu.Item>
        <Menu.Header>Pesanan</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name="Pesanan Saya"
            active={props.activeItem === listActiveItem.pesananSaya}
            onClick={event => props.setActiveItem(listActiveItem.pesananSaya)}
          />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Produk</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name="Produk Saya"
            active={props.activeItem === listActiveItem.produkSaya}
            onClick={event => props.setActiveItem(listActiveItem.produkSaya)}
          />
          <Menu.Item name="Tambah Produk" onClick={() => tambahProduk()} />
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Keuangan</Menu.Header>
        <Menu.Menu>
          <Menu.Item
            name="Penghasilan Saya"
            active={props.activeItem === listActiveItem.penghasilanSaya}
            onClick={event =>
              props.setActiveItem(listActiveItem.penghasilanSaya)
            }
          />
          <Menu.Item name="Saldo Saya" />
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  )
}

export default SidebarDashboardUsaha;
