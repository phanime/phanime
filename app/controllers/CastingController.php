<?php

class CastingController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$ids = Input::get('ids');

		if ($ids) {
			$castings = Casting::whereIn('id', $ids)->get();
		}

		return Response::json(array(
			'castings' => $castings),
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
		$inputs = Input::get('casting');

		$casting = new Casting;

		$casting->language = $inputs['language'];
		$casting->role = $inputs['role'];
		$casting->person_id = $inputs['person_id'];
		$casting->character_id = $inputs['character_id'];
		$casting->anime_id = $inputs['anime_id'];

		$casting->save();

		$casting_new = Casting::find($casting->id);

		return Response::json(array(
			'casting' => $casting_new
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
		$casting = Casting::find($id);

		return Response::json(array(
			'casting' => $casting
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
		$inputs = Input::get('casting');

		$casting = Casting::find($id);

		$casting->language = $inputs['language'];
		$casting->role = $inputs['role'];
		$casting->person_id = $inputs['person_id'];
		$casting->character_id = $inputs['character_id'];
		$casting->anime_id = $inputs['anime_id'];

		$casting->save();

		$casting_new = Casting::find($id);

		return Response::json(array(
			'casting' => $casting_new
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


}
