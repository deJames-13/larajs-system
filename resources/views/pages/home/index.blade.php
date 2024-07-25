<x-layouts.default :page="'Home'" :title="'Home'">


    <div class="rounded-t-lg overflow-clip">
        <div class="custom-circle-border bottom-pattern p-10 relative">

            <div style="width:100%; display:flex; justify-content:space-between; align-items:center">
                <div class="textcontainer">
                    <h1>Welcome to</h1>
                    <h2>GlitzVouge</h2>
                    <p>We cater to individuals regardless of gender to suffice <br>
                        your needs and wants in terms of cosmetic products</p>
                        <a href="/products" class="btn btn-primary mt-4">Shop Now!</a>
                  </div>

                <div class="picture" style="height:50%;width:50%;">
                    <img style=" width: 100%;height: 100%;object-fit: contain;overflow: hidden;border-radius: 20px;" src="{{ asset('images/newjeans.jpg') }}" alt="homepage">
                </div>
            </div>


    </div>
  </div>

</x-layouts.default>
