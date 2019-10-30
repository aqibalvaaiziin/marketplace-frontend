import React from 'react'
import {
  Grid,
  Menu,
  Search,
  Input,
  Label,
  Dropdown,
  Table,
} from 'semantic-ui-react'

function CardPesananContent(props) {
  return (
    <React.Fragment>
      <Grid.Row>
        <Grid.Column width="4">
          <Search size="small" placeholder="Search..." />
        </Grid.Column>
        <Grid.Column width="12" style={styles.paddingColumn}>
          Waktu Pesanan Dibuat
          <Input size="small" type="date" style={styles.marginInput}>
            <input />
          </Input>
          <Label size="small" style={styles.marginInput}>
            s/d
          </Label>
          <Input size="small" type="date" style={styles.marginInput}>
            <input />
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
                    options={props.options}
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
    </React.Fragment>
  )
}

const styles = {
  marginTabs: {
    marginBottom: 15,
  },
  marginInput: {
    marginLeft: 15,
  },
  paddingColumn: {
    paddingLeft: 20,
  },
  marginTable: {
    marginLeft: 10,
    marginRight: 10,
  },
}

export default CardPesananContent
