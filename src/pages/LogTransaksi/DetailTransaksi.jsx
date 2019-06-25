import React, { Component } from 'react'
import { Header, Icon, Table, Container } from 'semantic-ui-react'

export default class DetailTransaksi extends Component {
  render() {
    return (
      <Container>
        <Header as="h1" icon textAlign="center">
          <Icon name="cart" circular />
          <Header.Content>Id Transaksi</Header.Content>
          <Header.Content>{}</Header.Content>
        </Header>

        <Table singleLine>
          
          <Table.Header>
            <Table.HeaderCell>Nama Produk</Table.HeaderCell>
            <Table.HeaderCell>Jumlah Produk</Table.HeaderCell>
            <Table.HeaderCell>Berat Produk</Table.HeaderCell>
            <Table.HeaderCell>Subtotal</Table.HeaderCell>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>lala</Table.Cell>
              <Table.Cell>2000</Table.Cell>
              <Table.Cell>45kg</Table.Cell>
              <Table.Cell>20000000</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>lala</Table.Cell>
              <Table.Cell>2000</Table.Cell>
              <Table.Cell>45kg</Table.Cell>
              <Table.Cell>20000000</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>lala</Table.Cell>
              <Table.Cell>2000</Table.Cell>
              <Table.Cell>45kg</Table.Cell>
              <Table.Cell>20000000</Table.Cell>
            </Table.Row>
          </Table.Body>

        </Table>
      </Container>
    )
  }
}
