import _ from 'lodash'
import React from 'react'
import {
  Grid,
  Segment,
  Menu,
  Search,
  Icon,
  Input,
  Label,
  Dropdown,
  Table,
} from 'semantic-ui-react'

function CardTabs() {
  const options = [
    { key: 1, text: 'Choice 1', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
  ]
  return (
    <Segment>
      <Grid columns={12}>
        <Grid.Row>
          <Grid.Column width="16">
            <Menu pointing secondary fluid widths={6}>
              <Menu.Item name="Semua Pesanan" active="true" />
              <Menu.Item name="Belum Bayar" />
              <Menu.Item name="Perlu Dikirim" />
              <Menu.Item name="Selesai" />
              <Menu.Item name="Pembatalan" />
              <Menu.Item name="Pengembalian" />
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="4">
            <Search size="small" placeholder="Search..." />
          </Grid.Column>
          <Grid.Column width="12" style={styles.paddingColumn}>
            Waktu Pesanan Dibuat
            <Input size="small" type="date" style={styles.marginInput}>
              <input />
              <Icon name="calendar alternate" size="large" />
            </Input>
            <Label size="small" style={styles.marginInput}>
              s/d
            </Label>
            <Input size="small" type="date" style={styles.marginInput}>
              <input />
              <Icon name="calendar alternate" size="large" />
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Table celled style={styles.marginTable}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Produk</Table.HeaderCell>
                <Table.HeaderCell>Jumlah Harus Dibayar</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>
                  <Menu>
                    <Dropdown
                      text="Jasa Kirim"
                      options={options}
                      fluid
                      simple
                      item
                    />
                  </Menu>
                </Table.HeaderCell>
                <Table.HeaderCell>Aksi</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default CardTabs

const styles = {
  marginTabs: {
    marginBottom: 15,
  },
  marginInput: {
    marginLeft: 15,
  },
  paddingColumn: {
    paddingLeft: 220,
  },
  marginTable: {
    marginLeft: 10,
    marginRight: 10,
  },
}
