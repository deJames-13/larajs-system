<div class="container grid grid-cols-1 gap-4">

	<div class=" cart-table  py-4 flex flex-col space-y-6">
		<h1 class=" text-lg font-bold print:m-0">Order Items</h1>
		<div class="container overflow-x-auto">
			<table class="table lg:table-auto border-y-2 border-black`">
				<!-- head -->
				<thead class=" border-b-2 border-black">
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
		<x-card.billing-info />


	</div>
