@push('scripts')
	<script type="module">
		import {
			Order
		} from "{{ asset('js/components/OrderCard.js') }}";
		import Pagination from "{{ asset('js/components/Paginate.js') }}";
		import ajaxRequest from "{{ asset('js/assets/ajaxRequest.js') }}";


		let url = new URL(window.location.href);
		let page = 1;
		let statusStr = "all";
		const products = [];
		const actionsBtn = {
			edit: `<!-- <button id="btn-edit" class="edit btn btn-sm btn-primary ">Edit</button> -->`,
			view: `<button id="btn-view" class="view btn btn-sm btn-primary btn-outline">View Details</button>`,
			cancel: `<!-- <button id="btn-cancel" class="cancel btn btn-sm bg-base-100 hover:text-black text-red-400 border-red-400 hover:bg-red-400">Cancel Order</button> -->`,
			rate: `<button id="btn-rate" class="edit btn btn-sm btn-primary ">Rate</button>`,
			again: `<button id="btn-again" class="cancel btn btn-sm btn-primary btn-outline">Buy Again</button>`

		}
		const statuses = {
			'pending': {
				message: 'Your order is pending for approval.',
				icon: "<i class='fas fa-user-clock'></i>",
				actions: `
				${actionsBtn.edit}
				${actionsBtn.view}
				`,
			},
			'processing': {
				message: 'The seller is preparing your order.',
				icon: "<i class='fas fa-arrows-rotate'></i>",
				actions: `
				${actionsBtn.view}
				`,
			},
			'shipping': {
				message: 'Your order is on the way.',
				icon: "<i class='fas fa-truck-fast'></i>",
				actions: `
				${actionsBtn.view}
				`,
			},
			'completed': {
				message: 'Your order has been delivered.',
				icon: "<i class='fas fa-truck'></i>",
				actions: `
				${actionsBtn.rate}
				${actionsBtn.view}
				${actionsBtn.again}
				`,

			},
			'cancelled': {
				message: 'Your order has been cancelled.',
				icon: "<i class='fas fa-ban'></i>",
				actions: `
				${actionsBtn.view}
				${actionsBtn.again}
				`,
			},
		}
		const switchTabs = (id) => {
			// console.log(id);
			var current = $('.tab-active');
			current.removeClass('tab-active text-primary');
			$('#' + id).addClass('tab-active text-primary');
		}

		// INFO: GET ITEMS: natuto syang mag function
		const getItems = (page, statusStr) => {
			$('#tab-content').empty();
			$('#paginations').empty();

			let queries = [
				'page=' + page,
				'status=' + statusStr
			]
			let q = queries.join('&');

			const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
			ajaxRequest.get({
				url: '/api/orders?' + q,
				token: token,
				onSuccess: (response, status, error) => {
					// console.log(response);
					$('#no-orders').removeClass('hidden');
					const orders = response.data;
					if (orders.length > 0) {
						$('#no-orders').addClass('hidden');
					}
					orders.forEach(order => {
						order.statusMessage = statuses[`${order.status}`].message;
						order.statusIcon = statuses[`${order.status}`].icon;
						order.actions = statuses[`${order.status}`].actions;
						const orderCard = new Order(order);
						products.push(order);
						$('#tab-content').append(orderCard.render());
					});

					$('#search-bar').show();
					if (response.links.next || response.prev || response.meta.current_page > 1) {
						const links = new Pagination(response.links, response.meta.current_page).render(
							'#paginations');
						links.onClick(page => getItems(page, statusStr));
					} else {
						$('#paginations').empty();
						$('#search-bar').hide();
					}
					return response;
				},
				onError: (error) => {
					console.log(error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					});
				}
			});

		}


		const goToPage = (page) => {
			const res = getItems(page, statusStr);
		}

		$(document).on('click', "#btn-view", function() {
			const id = $(this).parent().data('id');
			console.log(id);
			window.location.href = '/orders/' + id;
		});


		$(document).ready(function() {
			$('.tab').click(function() {
				switchTabs(this.id);
				statusStr = this.id.split('-')[1];
				const res = getItems(1, statusStr);
			});
			goToPage(1, statusStr);
		})

		// INFO: VIEW ORDER
		$(document).on('click', '.order-card', function() {
			const id = $(this).data('id');
			window.location.href = '/orders/' + id;
		});

		const token = document.querySelector('meta[name="api-token"]').getAttribute('content');
		// INFO: CRUD: UPDATE
		const updateStatus = (statusString, id) => {
			ajaxRequest.put({
				url: '/api/orders/' + id,
				data: {
					status: '' + statusString
				},
				token: token,
				onSuccess: (response, status, error) => {
					setStatus(statusString);
					swalAlerts[statusString]();
				},
				onError: (error) => {
					console.log(error);
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Something went wrong!',
					});
				}
			});
		}
		// INFO: CANCEL ORDER
		$(document).on('click', '#btn-cancel', function() {
			const id = $(this).parent().data('id');
			// console.log(id);

			Swal.fire({
				title: 'Cancel Order',
				html: `
					<p>Are you sure you want to cancel <strong>Order #${id}</strong>?</p>
					<i class="text-xs">*Warning: This action cannot be undone!</i>
				`,
				icon: 'error',
				showCancelButton: true,
				confirmButtonText: 'Done',
				cancelButtonText: 'Cancel',
			}).then((result) => {
				if (result.isConfirmed) {

					// NOTE: UPDATE STATUS For customer?
					// updateStatus('cancelled', id);
				}
			});
		});
	</script>
@endpush
