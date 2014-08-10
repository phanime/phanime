<?php

class UserController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$username = Input::get('username');

		if ($username) {
			$users = User::where('username', '=', $username)->take(1)->get(); // This should always return 1 but take 1 is just there to show that it's suppose to return one
		} else {
			$users = User::all();
		}

		return Response::json(array(
			'users' => $users),
			200
		);
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$user = User::find($id);

		return Response::json(array(
			'users' => $user->toArray()),
			200
		);
	}




	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$user = User::find($id);
		$inputs = Input::get('user');

		$user->avatar = $inputs['avatar'];
		$user->profileBanner = $inputs['profileBanner'];
		$user->gender = $inputs['gender'];

		$user->save();

		return $this->show($id);
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}



	public function requestInvite() {
		$email = Input::get('email');
		$username = Input::get('username');
		$pass = $this->generateRandomPassword(10);
		$tagline = "Discover Anime like Never Before";

		$validator = Validator::make(
			array(
				'username' => $username,
				'email' => $email
			),
			array(
				'username' => 'required|unique:users',
				'email' => 'required|email|unique:users'
			)

		);

		if ($validator->fails()) {
			$messages = $validator->messages();
			return Response::json($messages);
		}

		// We can only get here if the validator passed

		// We should create an account for the user here
		// Since we're testing stuff mainly at the moment
		// we'll keep it to just sending out an email


		$data = array(
			'email' => $email,
			'username' => $username,
			'password' => $pass,
			'tagline' => $tagline,
		);

		Mail::send('emails.requestInvite', $data, function($message)
		{
			$email = Input::get('email');
			$message->to($email)->subject('Your Invite to Phanime');
		});	

	}

	public function generateRandomPassword($length) {
		$alphabet = "abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789";
		$pass = array(); 
		$alphaLength = strlen($alphabet) - 1;
		for ($i = 0; $i < $length; $i++) {
			$n = rand(0, $alphaLength);
			$pass[] = $alphabet[$n];
		}
		return implode($pass); //turn the array into a string
	}

	public function changePassword($id) {
		$user = User::find($id);
		$inputs = Input::all();

		if (Hash::check($inputs['existingPassword'], $user->password)) {
			// If the existingPassword provided matches with what we have in the database
			// Then we'll use the new password provided and update the user.
			if ($inputs['newPassword'] != NULL && $inputs['newPassword'] != '') {
				$user->password = Hash::make($inputs['newPassword']);

				$user->save();

				return Response::json(array(
					'user' => $user), 200
				);
			}
					 
		} else {
			
			return Response::json(array(
				'existingPassword' => 'Existing password did not match'), 200
			);

		}
	}

}
