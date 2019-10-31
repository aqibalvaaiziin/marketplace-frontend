import React, { useContext } from 'react'
import {
  Grid,
  Image,
  Header,
  List,
  Segment,
  Divider,
  Menu,
} from 'semantic-ui-react'
import { UserContext } from '../../App'

export const listActiveSidebarItem = {
  akunSaya: 'Akun Saya',
  pesananSaya: 'Pesanan Saya',
  uangSaya: 'Uang Saya',
}

function SidebarProfil(props) {
  const context = useContext(UserContext)
  return (
    <Segment>
      <Grid columns={2}>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={5}>
            <Image src="https://placeimg.com/120/120/any" fluid />
          </Grid.Column>
          <Grid.Column width={11}>
            <Header size="small" style={{ marginBottom: '5px' }}>
              {props.pengguna.nama}
            </Header>
            <Header size="tiny" style={{ marginTop: '0' }}>
              {props.pengguna.keanggotaan ? '(Anggota)' : '(Pengguna)'}
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
            onClick={event =>
              props.setActiveItem(listActiveSidebarItem.akunSaya)
            }
          />
          {props.pengguna.id_pengguna === context.getPengguna().id_pengguna && [
            <React.Fragment>
              <Menu.Item
                name="Pesanan Saya"
                active={props.activeItem == listActiveSidebarItem.pesananSaya}
                onClick={event =>
                  props.setActiveItem(listActiveSidebarItem.pesananSaya)
                }
              />
              <Menu.Item
                name="Uang Saya"
                active={props.activeItem == listActiveSidebarItem.uangSaya}
                onClick={event =>
                  props.setActiveItem(listActiveSidebarItem.uangSaya)
                }
              />
            </React.Fragment>,
          ]}
        </Menu>
      </Grid>
    </Segment>
  )
}
const styles = {
  paddingMenu: {
    padding: '10px',
  },
}
export default SidebarProfil
