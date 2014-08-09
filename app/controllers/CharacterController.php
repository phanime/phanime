<?php

class CharacterController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$ids = Input::get('ids');
		$query = Input::get('query');

		if ($ids) {
			$characters = Character::whereIn('id', $ids)->get();
		} else if ($query) {
			$characters = Character::where('first_name', 'like', '%'.$query.'%')->get();
		} else {
			$characters = Character::orderBy('created_at', 'desc')->get();
		}

		return Response::json(array(
			'characters' => $characters),
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
		$inputs = Input::get('character');


		// Validate character
		$validation = $this->validateCharacter($inputs);

		if ($validation !== true) {
			return Response::json($validation);
		}

		// Validation passed if control reaches here


		$character = new Character;

		$character->first_name = $inputs['first_name'];
		$character->last_name = $inputs['last_name'];
		$character->biography = $inputs['biography'];
		$character->alternate_name = $inputs['alternate_name'];
		$character->japanese_name = $inputs['japanese_name'];
		$character->gender = $inputs['gender'];
		$character->cover_photo = $inputs['cover_photo'];

		$character->save();

		$character_new = Character::find($character->id);

		return Response::json(array(
			'character' => $character_new
			),
			200
		);

	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$character = Character::find($id);

		return Response::json(array(
			'character' => $character
			),
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
		$inputs = Input::get('character');

		$character = Character::find($id);

		$character->first_name = $inputs['first_name'];
		$character->last_name = $inputs['last_name'];
		$character->biography = $inputs['biography'];
		$character->alternate_name = $inputs['alternate_name'];
		$character->japanese_name = $inputs['japanese_name'];
		$character->gender = $inputs['gender'];
		$character->cover_photo = $inputs['cover_photo'];

		$character->save();

		$character = Character::find($id);

		return Response::json(array(
			'character' => $character
			),
			200
		);
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

	protected function validateCharacter($inputs) {

		// If last name is null / empty then we should only check first name
		// for uniqueness, else we should do a combination.

		if ($inputs['last_name']) {
			$validator = Validator::make(
				array(
					'first_name' => $inputs['first_name'],
					'last_name' => $inputs['last_name']
				),
				array(
					'first_name' => 'required|unique_with:characters,last_name',
					'last_name' => 'required',
				)
			);
		} else {
			$validator = Validator::make(
				array(
					'first_name' => $inputs['first_name']
				),
				array(
					'first_name' => 'required|unique:characters',
				)
			);			
		}

		if ($validator->fails()) {
			return $validator->messages();
		} else {
			return true;
		}
	}


}
