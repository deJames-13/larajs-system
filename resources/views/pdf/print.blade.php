@props([
    'title' => '',
    'data' => [],
])
<!DOCTYPE html>
<html lang="en">

	<head>
		<title>Print Table</title>
		<meta charset="UTF-8">
		<meta name=description content="">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
		<style>
			body {
				font-family: 'Arial', sans-serif;
				margin: 20px
			}

			@page {
				margin: 0px;
			}

			body {
				margin: 0px;
			}
		</style>
	</head>

	<body>

		<h1>{{ $title ?? '' }}</h1>
		<div class="table-responsive-sm">
			<table class="table table-sm table-bordered table-condensed table-striped">
				@foreach ($data as $row)
					@if ($loop->first)
						<tr>
							@foreach ($row as $key => $value)
								<th>{!! $key !!}</th>
							@endforeach
						</tr>
					@endif
					<tr>
						@foreach ($row as $key => $value)
							@if (is_string($value) || is_numeric($value))
								<td>{!! $value !!}</td>
							@else
								<td></td>
							@endif
						@endforeach
					</tr>
				@endforeach
			</table>
		</div>
	</body>

</html>
