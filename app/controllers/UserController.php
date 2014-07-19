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
		//
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



	public function authenticateUser() {
		$username = Input::get('username');
		$password = Input::get('password');
		if (Auth::attempt(array('username' => $username, 'password' => $password))) {
			return Response::JSON(array(
					"session" => array(
						"authToken" => Auth::user()->password,
						"user_id" => Auth::id(),
					)
			), 200);	
		}
	}


}
