<!-- Open the modal using ID.showModal() method -->
{{-- <button class="btn" onclick="my_modal_5.showModal()">open modal</button> --}}

@props([
    'id' => '',
    'content' => '',
    'actions' => '',
])

<dialog id="modal_{{ $id }}" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">

		{{ $content ?? '' }}


		<div class="modal-action">
			{{ $actions ?? '' }}
		</div>
	</div>
</dialog>
