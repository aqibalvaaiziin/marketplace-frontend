import React from 'react'
import { Container, Divider, List, Grid, Image } from 'semantic-ui-react'

function Footer() {
    
    return (
        <div>
             <Divider style={styles.topFooter}/>
             <Container style={{marginTop:"45px",marginBottom:"10px"}}>
                 <Grid>
                     <Grid.Row>
                         <Grid.Column width={5}>
                            <List>
                                <List.Item style={{marginBottom:"10px"}}>Tentang Marketplace</List.Item>
                                <List.Item style={{marginBottom:"10px"}}>Syarat dan Ketentuan</List.Item>
                                <List.Item style={{marginBottom:"10px"}}>Kebijakan Privasi</List.Item>
                            </List>
                         </Grid.Column>
                         <Grid.Column width={8}>
                            <List>
                                <List.Item style={{marginBottom:"10px"}}>Bantuan Marketplace</List.Item>
                                <List.Item style={{marginBottom:"10px"}}>Kategori</List.Item>
                            </List>
                         </Grid.Column>
                         <Grid.Column width={3}>
                            <Image src='https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png' size='mini' floated='left' />
                            <small>© 2019, PT. Marketplace</small>
                         </Grid.Column>
                     </Grid.Row>
                 </Grid>
             </Container>
        </div>
    )
}


const styles = {
    topFooter :{
        marginTop : '360px'
    }
}

export default Footer
