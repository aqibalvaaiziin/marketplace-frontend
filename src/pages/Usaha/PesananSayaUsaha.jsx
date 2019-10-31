import React, { useState } from 'react';
import Menu, { listActiveItemPesanan } from './CardTabs';

function PesananSayaUsaha() {
	const [ activeItemPesanan, setActiveItemPesanan ] = useState(listActiveItemPesanan.semuaPesanan);

	return (
		<div style={{ marginLeft: '20px' }}>
			<Menu activeItemPesanan={activeItemPesanan} setActiveItemPesanan={setActiveItemPesanan} />
		</div>
	);
}

export default PesananSayaUsaha;
