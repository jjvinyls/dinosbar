<template>
	<!-- MENU -->
	<BContainer fluid class="bg-white">
		<CMenu />
	</BContainer>
</template>

<script>
// [IMPORT] Personal //
	import CMenu from "@/components/Menu";

	export default {
		name: "PMenu",

		components: {
			CMenu,
		},
	};
</script>