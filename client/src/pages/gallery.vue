<template>
	<BContainer class="my-5">
		<!-- Page Title -->
		<h1 class="mb-3 text-center font-weight-bold text-primary">
			{{ pageData.title }}
		</h1>

		<CFoodImages :images="common.galleryImages" />
	</BContainer>
</template>

<script>
import CFoodImages from "../components/home/CFoodImages.vue";
import common from "../defaults/common";
import pageData from "@/defaults/pages/gallery";

export default {
	name: "CGallery",

	data() 
	{
		return {
			pageData: pageData,
			common: common
		};
	},

	components: {
		CFoodImages
	}
};
</script>