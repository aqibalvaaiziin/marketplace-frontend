import _ from 'lodash'
import React from 'react'
import { Grid, Segment, Menu } from 'semantic-ui-react'
import CardPesananContent from './CardPesananContent'

export const listActiveItemPesanan = {
  semuaPesanan: 'Semua Pesanan',
  belumBayar: 'Belum Bayar',
  perluDikirim: 'Perlu Dikirim',
  selesai: 'Selesai',
  pembatalan: 'Pembatalan',
  pengembalian: 'Pengembalian',
}

function CardTabs(props) {
  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]
  return (
    <Segment>
      <Grid columns={16}>
        <Grid.Row>
          <Grid.Column width="16">
            <Menu pointing secondary fluid widths={6}>
              <Menu.Item
                name="Semua Pesanan"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.semuaPesanan
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.semuaPesanan)
                }
              />
              <Menu.Item
                name="Belum Bayar"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.belumBayar
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.belumBayar)
                }
              />
              <Menu.Item
                name="Perlu Dikirim"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.perluDikirim
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.perluDikirim)
                }
              />
              <Menu.Item
                name="Selesai"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.selesai
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.selesai)
                }
              />
              <Menu.Item
                name="Pembatalan"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.pembatalan
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.pembatalan)
                }
              />
              <Menu.Item
                name="Pengembalian"
                active={
                  props.activeItemPesanan === listActiveItemPesanan.pengembalian
                }
                onClick={event =>
                  props.setActiveItemPesanan(listActiveItemPesanan.pengembalian)
                }
              />
            </Menu>
          </Grid.Column>
        </Grid.Row>
        {props.activeItemPesanan === listActiveItemPesanan.semuaPesanan && (
          <CardPesananContent options={options} />
        )}
        {props.activeItemPesanan === listActiveItemPesanan.belumBayar && (
          <CardPesananContent options={options} />
        )}
        {props.activeItemPesanan === listActiveItemPesanan.perluDikirim && (
          <CardPesananContent options={options} />
        )}
        {props.activeItemPesanan === listActiveItemPesanan.selesai && (
          <CardPesananContent options={options} />
        )}
        {props.activeItemPesanan === listActiveItemPesanan.pembatalan && (
          <CardPesananContent options={options} />
        )}
        {props.activeItemPesanan === listActiveItemPesanan.pengembalian && (
          <CardPesananContent options={options} />
        )}
      </Grid>
    </Segment>
  )
}

export default CardTabs
