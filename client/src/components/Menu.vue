<template>
	<BContainer class="py-5">
		<div v-if="loading" class="my-5">
			<h1 class="my-5 text-primary text-center">Loading..</h1>
		</div>

		<div v-if="!loading" id="menu">
			<div class="text-center">
				<h1 class="m-0 text-primary">Our Menu</h1>
				<hr class="mb-4 bg-light" style="max-width: 100px;"/>
			</div>
	
			<ul class="menu-filter-list list-inline text-center">
				<li
					@click="filterMenu('all')"
					:class="{ 'is-checked': currentTab == 'all' }"
				>
					All
				</li>
				<li
					@click="filterMenu('bar-snack')"
					:class="{ 'is-checked': currentTab == 'bar-snack' }"
				>
					Bar Snacks
				</li>
				<li
					@click="filterMenu('wings')"
					:class="{ 'is-checked': currentTab == 'wings' }"
				>
					Wings
				</li>
				<li
					@click="filterMenu('burger')"
					:class="{ 'is-checked': currentTab == 'burger' }"
				>
					Burgers
				</li>
				<li
					@click="filterMenu('sandwich')"
					:class="{ 'is-checked': currentTab == 'sandwich' }"
				>
					Sandwiches
				</li>
				<li
					@click="filterMenu('salad')"
					:class="{ 'is-checked': currentTab == 'salad' }"
				>
					Salads
				</li>
				<li
					@click="filterMenu('entree')"
					:class="{ 'is-checked': currentTab == 'entree' }"
				>
					Entrees
				</li>
			</ul>
	
			<BRow class="menu-filter-items">
				<BCol
					v-for="(item, i) in filteredMenu" :key="i"
					cols="12" sm="12" md="6" lg="6" xl="4"
					class="border border-light py-4 start menu-item"
					style="border-style: dotted !important;"
				>
					
					<div class="menu-box clearfix">
						<div class="thumb">
							<Viewer
								:options="{ title: false, transition: false }"
								class="text-center"
							>
								<!-- Thumbnail -->
								<img
									:src="item.img && item != '' ? item.img : placeholderImg"
									width="70"
									class="d-none d-sm-block"
								/>
							</Viewer>
						</div>
	
						<div class="menu-content">
							<h4 class="mb-3 text-primary">
								<a @click="viewProduct(i)" class="text-primary">
									{{ item.name }}
								</a>
								<span>
									{{
										new Intl.NumberFormat('en-US', {
											style: 'currency',
											currency: 'USD'
										}).format(item.cost)
									}}
								</span>
							</h4>
							<p class="m-0 p-0 text-info">
								{{
									item.description.length > 100 ?
										item.description.substring(0, 100 - 3) + '...' :
										item.description
								}}
							</p>
						</div>
					</div>
				</BCol>
			</BRow>
	
			<!-- Product Viewer -->
			<div
				class="overlay w-100 h-100 position-fixed"
				:class="{
					'd-none': !viewingProduct,
					'd-block': viewingProduct
				}"
			>
				<div class="overlay-content w-100 px-2 position-relative text-center">
					<BCard
						no-body
						bg-variant="light"
						text-variant="dark"
						border-variant="secondary"
						class="m-auto h-100 text-center shadow"
						style="max-width: 800px;"
					>
						<BCardHeader class="bg-dark">
							<BButton
								variant="danger"
								class="my-2 p-1 px-4 float-right"
								pill
								@click="viewingProduct = false"
								style="border-radius: 20px !important;"
							>
								✖
							</BButton>
						</BCardHeader>
	
						<BCardBody class="overlay-content-body" style="overflow-y: auto;">
							<BRow>
								<BCol cols="12" class="text-center">
									<Viewer
										:options="{ title: false, transition: false }"
										class="text-center"
									>
										<div class="img-holder mb-4 text-center">
	
											<img
												:src="filteredMenu[viewingProductNumber].img || placeholderImg"
												v-lazy="filteredMenu[viewingProductNumber].img || placeholderImg"
												alt="No Photo"
											/>
										</div>
									</Viewer>
								</BCol>
								<BCol cols="12" class="my-3">
									<h4 class="font-weight-bold text-primary">
										{{ filteredMenu[viewingProductNumber].name }}
									</h4>
									<h5>{{ filteredMenu[viewingProductNumber].description }}</h5>
								</BCol>
							</BRow>
						</BCardBody>
	
						<BCardFooter class="bg-dark">
							<h5 class="m-0 font-weight-bold text-primary">
								{{ 
									new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'USD'
									}).format(filteredMenu[viewingProductNumber].cost)
								}}
							</h5>
						</BCardFooter>
					</BCard>
				</div>
			</div>
		</div>
	</BContainer>
</template>

<script>
	import axios from "axios";

	export default {
		name: "CMenu",
		
		data() 
		{
			return {
				loading: true,
				
				googleScriptsUrl: "https://script.googleusercontent.com/macros/echo?user_content_key=91MY3UpEMJv3gFKe0a0LMI7h2zWzyAwJkgzRsKtrCvxud9wNM8XCaKAV7xZ2zRcnySo-PMToPjmmwBhjdY4RRv3YG0ne8igqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnFnNpRCRvnkr2CWoxk1N7CdsFzTy3zCyAIa-rJoMr9Bm2GRP8bP_PIo9Lioa_UXh9JxQoh38wTHqOy_ZzYLBPEtDgtH_Ar-55dz9Jw9Md8uu&lib=MUH7sYhu7AQ56WgSB711qRGnpgZ1Ms4TS",

				currentTab: "all",
				
				menu: [
			],
				filteredMenu: [
			],
				placeholderImg: require("../assets/images/logo.jpg"),

				viewingProduct: false,
				viewingProductNumber: 0,
			};
		},

		methods: {
			filterMenu(filter) 
			{
				this.loading = true;
				this.currentTab = filter;
				this.filteredMenu = [
			];

				if (filter == "all") 
			{
				this.filteredMenu = this.menu; 
			}
				else 
			{
					for (let i = 0; i < this.menu.length; i++) 
				{
						const mi = this.menu[i];
					
						if (mi.category == filter) 
					{
							this.filteredMenu.push(mi);
						}
					}
				}

				this.loading = false;
			},

			viewProduct(i) 
			{
				this.viewingProduct = true;
				this.viewingProductNumber = i;
			},

			splitCSVLine(line) 
		{
				const regex = /(?:,|\n|^)("(?:(?:"")*[^"]*)*"|[^",\n]*|(?:\n|$))/g;
				const values = [
			];
				let matches;
				while ((matches = regex.exec(line)) !== null) 
			{
					let matched = matches[1];
					if (matched && matched.startsWith("\"") && matched.endsWith("\"")) 
				{
						matched = matched.substring(1, matched.length - 1).replace(/""/g, "\"");
					}
					values.push(matched);
				}
				return values;
			},

			CSVToJSON(csv)
			{
				const lines = csv.split("\n");
				const result = [
			];
				const headers = this.splitCSVLine(lines[0]);

				for (let i = 1; i < lines.length; i++) 
			{
					if (!lines[i])
						continue;
					const obj = {
				};
					const currentline = this.splitCSVLine(lines[i]);

					for (let j = 0; j < headers.length; j++) 
				{
						obj[headers[j]] = currentline[j];
					}
					result.push(obj);
				}
				return result;
			}
		},

		async created() 
		{
			const res = await axios.get(this.googleScriptsUrl);

			console.log(res.data);

			this.menu = this.CSVToJSON(res.data);

			this.filteredMenu = this.menu;

			console.log(this.menu);

			this.loading = false;

			window.addEventListener("keyup", (event) => 
			{
				if (event.key == "Escape") 
				{
					this.viewingProduct = false;
				}
			});
		},
	};
</script>

<style lang="scss" scoped>
	/* Menu Style */
	.menu-box {
		.thumb {
			float: left;
			margin-right: 20px;
			height: 60px;
			overflow: hidden;
		}

		.menu-content {
			overflow: hidden;
	
			h4 {
				margin-bottom: 5px;
				font-family: "Poppins", sans-serif;
				border-bottom: 1px dashed rgb(196, 131, 131);
				padding-bottom: 5px;
				font-weight: 500;
				text-transform: uppercase;
				font-size: 15px;
				letter-spacing: 1px;
	
				a {
					color: #444;
	
					&:hover {
						color: #c0996b;
					}
				}
	
				span {
					float: right;
					display: block;
					font-family: "Lato", sans-serif;
				}
			}
		}
	}
	

	/** isoptope **/
	.menu-filter-list {
		padding-bottom: 30px;

		li {
			display: inline-block;
			cursor: pointer;
			padding: 10px 20px 6px;
			text-transform: uppercase;
			background: #f5f5f5;
			-moz-transition: all 0.3s;
			-o-transition: all 0.3s;
			-webkit-transition: all 0.3s;
			transition: all 0.3s;
			font-family: "Poppins", sans-serif;

			&.is-checked {
				background: #ee3541;
				color: #fff;
			}

			&:hover {
				background: #ee3541;
				color: #fff;
			}
		}
	}

	.menu-grid {
		display: block;
		position: relative;
		overflow: hidden;

		img {
			-moz-transition: all 0.3s;
			-o-transition: all 0.3s;
			-webkit-transition: all 0.3s;
			transition: all 0.3s;
		}
	}

	.menu-grid-desc {
		padding: 13px 15px;
		background: #fff;
		color: #888;

		.price {
			color: #c0996b;
			font-weight: 700;
			font-size: 20px;
			line-height: 29px;
		}

		h4 {
			padding: 5px 0;
			font-weight: 400;
			text-transform: capitalize;
		}

		p {
			margin-bottom: 0px;
		}
	}

	/***** OVERLAY *****/
	.overlay {
		z-index: 2000;
		top: 0;
		left: 0;

		background: rgba(255, 255, 255, 0.1);

		backdrop-filter: blur(6px);
	}

	.overlay-content {
		padding: 30px;
		max-height: 96vh;

		@media (min-width: 768px) {
			max-height: 60vh;
		}
	}

	.overlay-content-body {
		background-color: rgb(41, 41, 41);
		color: white;
	}

	.img-holder {
		margin: 0 auto;
		text-align: center;
		width: 100%;
		max-width: 400px;
		height: 300px;
		overflow: hidden;

		img {
			float: left;
			width:  100%;
			//max-width: 300px;
			height: 400px;
			object-fit: cover;
		}
	}
</style>