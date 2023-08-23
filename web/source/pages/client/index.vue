<template>
	<div class="client-service-content">
		<div class="container">
			<div class="client-service-title">Client Service</div>
			<div class="client-service-des">Welcome to PHANDANGHOANG Client Service.</div>
			<div class="client-service-des">Here you can reference our policies, frequently asked questions, orders, and
				returns tracking. Our Client Service Team will be happy to give you further assistance on all other
				enquiries. By contacting Client Service, you agree that your data will be transferred outside your country
			</div>

			<div :class="isMobile ? 'client-service-item-content' : 'client-service-item-content d-flex'">
				<div class="client-service-item">
					<div class="client-service-item-title">LIVE CHAT</div>
					<div class="client-service-item-des">Mon to Sat: 10am-8pm</div>
				</div>
				<div class="client-service-item">
					<div class="client-service-item-title">CAll us</div>
					<div class="client-service-item-des">+66 2459 0250</div>
					<div class="client-service-item-des">Mon to Sat: 10am-8pm</div>
				</div>
				<div class="client-service-item">
					<div class="client-service-item-title">contact us</div>
					<div class="client-service-item-des">Send a message</div>
					<div class="client-service-item-des">We’ll reply within 48 hours</div>
				</div>
				<div class="client-service-item">
					<div class="client-service-item-title">store appointment</div>
					<div class="client-service-item-des">Book an appointment</div>
					<div class="client-service-item-des">The store will reply shortly.</div>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
export default {
	name: 'AboutPage',
	data() {
		return {
			isMobile: false
		}
	},
	mounted() {
		if (!this.$route.hash) {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
		this.isMobile = this.checkMobile()
	},
	methods: {
		checkMobile() {
			if (!process.server) {
				if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
					return true
				} else {
					return false
				}
			}
		}
	}
}
</script>
<style lang="scss">
.client-service-content {
	background-color: #F8F8F8;
	padding-top: 110px;
	padding-bottom: 200px;

	.client-service-title {
		color: #000;
		text-align: center;
		font-family: 'Aeroport';
		font-size: 35px;
		margin-bottom: 30px;
	}

	.client-service-des {
		color: #000;
		text-align: center;
		font-family: 'Aeroport-light';
		font-size: 15px;
		width: 580px;
		margin: auto;
	}

	.client-service-item-content {
		margin-top: 250px;

		.client-service-item {
			width: calc((100% / 4) - 8px);
			position: relative;

			.client-service-item-title {
				color: #000;
				text-align: center;
				font-family: 'Aeroport';
				font-size: 20px;
				margin-bottom: 35px;
				text-transform: uppercase;
				font-weight: 800;
			}

			.client-service-item-des {
				color: #000;
				text-align: center;
				font-family: 'Aeroport-light';
				font-size: 14px;
			}

			&:after {
				content: "";
				height: 90%;
				width: 2px;
				display: block;
				border-right: 1px solid #000;
				position: absolute;
				right: 0px;
				top: 15%;
			}

			&:last-child:after {
				display: none;
			}
		}
	}
}

@media (max-width: 520px) {
	.client-service-content {
		background-color: #F8F8F8;
		padding-top: 80px;
		padding-bottom: 120px;

		.client-service-title {
			color: #000;
			text-align: center;
			font-family: 'Aeroport';
			font-size: 20px;
			margin-bottom: 30px;
		}

		.client-service-des {
			color: #000;
			text-align: center;
			font-family: 'Aeroport-light';
			font-size: 10px;
			width: 330px;
			margin: auto;
		}

		.client-service-item-content {
			margin-top: 60px;

			.client-service-item {
				width: 200px;
				margin: auto;
				position: relative;
				margin-top: 30px;
				padding-bottom: 20px;

				.client-service-item-title {
					color: #000;
					text-align: center;
					font-family: 'Aeroport';
					font-size: 17px;
					margin-bottom: 20px;
					text-transform: uppercase;
				}

				.client-service-item-des {
					color: #000;
					text-align: center;
					font-family: 'Aeroport-light';
					font-size: 10px;
				}

				&:after {
					content: "";
					height: 90%;
					width: 100px;
					display: block;
					border-bottom: 1px solid #000;
					border-right: none;
					position: absolute;
					bottom: 0px;
					left: 50%;
					transform: translate(-50%);
				}

				&:last-child:after {
					display: none;
				}
			}
		}
	}
}
</style>