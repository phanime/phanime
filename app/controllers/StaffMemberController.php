<?php

class StaffMemberController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$ids = Input::get('ids');

		if ($ids) {
			$staffMembers = StaffMember::whereIn('id', $ids)->get();
		}

		return Response::json(array(
			'staffMembers' => $staffMembers),
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
		$inputs = Input::get('staffMember');

		$staffMember = new StaffMember;

		$staffMember->anime_id = $inputs['anime_id'];
		$staffMember->person_id = $inputs['person_id'];
		$staffMember->staff_position = $inputs['staff_position'];

		$staffMember->save();

		$staffMember_new = StaffMember::find($staffMember->id);

		return Response::json(array(
			'staffMember' => $staffMember_new
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
		$staffMember = StaffMember::find($id);

		return Response::json(array(
			'staffMember' => $staffMember
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
		$inputs = Input::get('staffMember');

		$staffMember = StaffMember::find($id);

		$staffMember->anime_id = $inputs['anime_id'];
		$staffMember->person_id = $inputs['person_id'];
		$staffMember->staff_position = $inputs['staff_position'];

		$staffMember->save();

		$staffMember_new = StaffMember::find($id);

		return Response::json(array(
			'staffMember' => $staffMember_new
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
