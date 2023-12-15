<template>
	<div v-if="loading == false">
		<CHero
			:slides="pageData.caraousel"
			:maxHeight="1000"
		/>

		<!-- About Dinos Bar & Grill -->
		<BContainer fluid>
			<BContainer class="py-md-5">
				<CAbout />
			</BContainer>
		</BContainer>

		<!-- MENU -->
		<BContainer fluid class="py-5 bg-white">
			<CMenu />
		</BContainer>

		<!-- REVIEWS -->
		<CReviews />

		<!-- FOOD IMAGES -->
		<CFoodImages
			:images="common.galleryImages"
			:isHomePage="true"
		/>

		<!-- MAP AND LOCATION -->
		<CMapAndLocation />

		<!-- INFO -->
		<CContactInfo />
	</div>
</template>

<script>
// [IMPORT] Personal
import CAbout from "@/components/About";
import CContactInfo from "@/components/ContactInfo";
import CFoodImages from "@/components/home/CFoodImages";
import CHero from "@/components/home/Hero";
import CMapAndLocation from "@/components/MapAndLocation";
import CMenu from "@/components/Menu";
import CReviews from "@/components/home/Reviews";
import common from "../defaults/common";
import pageData from "@/defaults/pages";
import router from "@/router";

export default {
	name: "PHome",

	components: {
		CAbout,
		CContactInfo,
		CFoodImages,
		CHero,
		CMapAndLocation,
		CMenu,
		CReviews,
	},

	data() 
	{
		return {
			loading: true,

			common: common,
			pageData: pageData,
			reqData: {
			},
			reikiTitle: "Reiki Title",
			reikiDescription: "Reiki description goes here",
			services: [
			],
		};
	},

	methods: {
		redirectCompanyInfo() 
		{
			router.push({
				name: "book" 
			}); 
		},
	},

	async created() 
	{
		this.$store.state.isHomePage = true;

		this.loading = false;
	},

	destroyed() 
	{
		this.$store.state.isHomePage = false;
	},
};
</script>

<style lang="scss" scoped>
	.fade-enter-active,
	.fade-leave-active { transition: opacity 1s; }
	.fade-enter,
	.fade-leave-to { opacity: 0; }
</style>
