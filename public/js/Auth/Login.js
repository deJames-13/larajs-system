import Modal from '../components/Modal.js';


const modal = new Modal({
    id: 'login_modal',
    top: `
        <div class="flex items-center space-x-2">
        <h3 class="font-extrabold uppercase text-3xl">Log In</h3>
        </div>
    `,
    content: `
    <form method="POST">
    	<div class="form-control">
            <label for="email" class="label">Email</label>
            <input type="email" id="email" name="email" placeholder="Email Address" class="input input-bordered"
                required>
        </div>
        <div class="form-control">
            <label for="password" class="label">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" class="input input-bordered"
                required>
        </div>

        <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
    `,
});

