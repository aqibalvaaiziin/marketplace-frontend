import React, { Component, Fragment } from 'react'
import { Container, Table } from 'semantic-ui-react'

export default class Home extends Component {
  render() {
    return (
      <Fragment>
        <Container>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No</Table.HeaderCell>
                <Table.HeaderCell>Nama Produk</Table.HeaderCell>
                <Table.HeaderCell>Harga</Table.HeaderCell>
                <Table.HeaderCell>Jumlah</Table.HeaderCell>
                <Table.HeaderCell>Sub Total</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>1</Table.Cell>
                <Table.Cell>Barang 1</Table.Cell>
                <Table.Cell>3000</Table.Cell>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>6000</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>2</Table.Cell>
                <Table.Cell>Barang 2</Table.Cell>
                <Table.Cell>4000</Table.Cell>
                <Table.Cell>3</Table.Cell>
                <Table.Cell>12000</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="right" colSpan="4">
                  Total
                </Table.HeaderCell>
                <Table.HeaderCell>18000</Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
        </Container>
      </Fragment>
    )
  }
}
