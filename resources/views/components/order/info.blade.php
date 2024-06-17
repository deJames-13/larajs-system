<div class="container grid grid-cols-1 gap-4">

	<div class="_skeleton cart-table  py-4 lg:px-12  flex flex-col space-y-6">
		<h1 class="_skeleton text-lg font-bold print:m-0">Order Items</h1>
		<div class="container overflow-x-auto">
			<table class="table lg:table-auto border-y-2 border-black">
				<!-- head -->
				<thead class="_skeleton border-b-2 border-black">
					<tr>
						<th class="print:hidden">
						</th>
						<th>Product</th>
						<th>Unit Price</th>
						<th>Qty</th>
						<th>Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody id="cart-body">

				</tbody>


			</table>
		</div>
	</div>

	<x-card.billing-info />


</div>
