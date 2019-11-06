import React from 'react';
import { Container, Header, Grid, Image, TextArea, Button } from 'semantic-ui-react';
import StarRatings from 'react-star-ratings';

function ItemReview(props) {
	return (
		<Container>
			{props.transaksi.detail_transaksis.map((detail) => (
				<div key={detail.id_detiltransaksi}>
					<Grid>
						<Grid.Row>
							<Grid.Column width={9}>
								<Header as="h5">Nama Barang : {detail.produk.nama}</Header>
							</Grid.Column>
							<Grid.Column width={7}>
								<Grid>
									<Grid.Column width={4}>
										<p style={{ fontSize: 15 }}>Rating :</p>
									</Grid.Column>
									<Grid.Column width={11}>
										<StarRatings
											starRatedColor="blue"
											numberOfStars={5}
											name="rating"
											starDimension="20px"
											starSpacing="5px"
										/>
									</Grid.Column>
								</Grid>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Grid>
						<Grid.Column width={9}>
							<Image src="https://placeimg.com/120/120/any" size="small" />
						</Grid.Column>
						<Grid.Column width={7}>
							<p style={{ fontSize: 15 }}>Komentar</p>
							<TextArea rows={3} style={{ width: 300, height: 80 }} />
							<Button color="yellow" floated="right" style={{ marginRight: 50 }}>
								Kirim
							</Button>
						</Grid.Column>
					</Grid>
				</div>
			))}
		</Container>
	);
}

export default ItemReview;
