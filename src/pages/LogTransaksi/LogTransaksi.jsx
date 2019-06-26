import React, { Component, Fragment } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import { Link } from 'react-router-dom'

export default class LogTransaksi extends Component {
  state = {
    transaksi: [],
  }
  render() {
    return (
      <Fragment>
        <Link
          to={{ pathname: '/transaksi/detail', state: this.state.transaksi }}>
          <CardLogTransaksi />
        </Link>
      </Fragment>
    )
  }
}
