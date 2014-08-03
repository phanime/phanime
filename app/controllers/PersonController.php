<?php

class PersonController extends \BaseController {

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
			$people = Person::whereIn('id', $ids)->get();
		} else if ($query) {
			$people = Person::where('first_name', 'like', '%'.$query.'%')->get();
		}

		return Response::json(array(
			'people' => $people),
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
		$inputs = Input::get('person');

		$person = new Person;

		$person->cover_photo = $inputs['cover_photo'];
		$person->first_name = $inputs['first_name'];
		$person->last_name = $inputs['last_name'];
		$person->given_name = $inputs['given_name'];
		$person->family_name = $inputs['family_name'];
		$person->gender = $inputs['gender'];
		$person->birth_date = $inputs['birth_date'];
		$person->website = $inputs['website'];
		$person->birth_place = $inputs['birth_place'];
		$person->blood_type = $inputs['blood_type'];
		$person->other_info = $inputs['other_info'];

		$person->save();

		$person_new = Person::find($person->id);

		return Response::json(array(
			'person' => $person_new
			), 200
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
		$person = Person::find($id);

		return Response::json(array(
			'person' => $person
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
		$inputs = Input::get('person');

		$person = Person::find($id);

		$person->cover_photo = $inputs['cover_photo'];
		$person->first_name = $inputs['first_name'];
		$person->last_name = $inputs['last_name'];
		$person->given_name = $inputs['given_name'];
		$person->family_name = $inputs['family_name'];
		$person->gender = $inputs['gender'];
		$person->birth_date = $inputs['birth_date'];
		$person->website = $inputs['website'];
		$person->birth_place = $inputs['birth_place'];
		$person->blood_type = $inputs['blood_type'];
		$person->other_info = $inputs['other_info'];

		$person->save();

		$person = Person::find($id);

		return Response::json(array(
			'person' => $person
			), 200
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
