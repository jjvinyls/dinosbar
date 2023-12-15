<template>
	<div class="mt-5 w-100 text-secondary">
		<BContainer>
			<BRow class="pb-5">
				<BCol cols="12" class="text-center" data-aos="fade-up" data-aos-once="true">
					<h1 class="mb-5 text-primary">Follow Us</h1>
					<SocialMediaPlug variant="primary" size="3x" />
				</BCol>

				<BCol cols="12">
					<CFoodImages :images="common.followUsImages" />

					<div class="text-center">
						<RouterLink to="/gallery">
							<BButton
								class="my-5"
								size="lg"
							>
								View More Images
							</BButton>
						</RouterLink>
					</div>
				</BCol>
			</BRow>
		</BContainer>
	</div>
</template>

<script>
import CFoodImages from "../components/home/CFoodImages.vue";
import SocialMediaPlug from "../components/SocialMediaPlug";
import common from "../defaults/common";
import companyInfo from "../defaults/companyInfo";
import pageLinks from "../defaults/pageLinks";

export default {
	components: {
		SocialMediaPlug,
		CFoodImages
	},

	data() 
	{
		return {
			companyInfo: companyInfo,
			pageLinks: pageLinks,
			common: common,
		};
	},
};
</script>