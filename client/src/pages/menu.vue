<template>
	<!-- MENU -->
	<BContainer fluid class="bg-white">
		<CMenu />
	</BContainer>
</template>

<script>
import CMenu from "@/components/Menu";

export default {
	name: "PMenu",

	components: {
		CMenu,
	},
};
</script>