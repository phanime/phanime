<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/


Route::group(array('prefix' => 'api/v1'), function() {
	Route::resource('animes', 'AnimeController');
	Route::resource('users', 'UserController');
	Route::resource('episodes', 'EpisodeController');
	Route::resource('videos', 'VideoController');
	Route::resource('libraryEntries', 'LibraryEntryController');
	Route::post('session', 'UserController@authenticateUser');

	Route::post('oauth/token', function()
	{
		return AuthorizationServer::performAccessTokenFlow();
	});

});

Route::get('{ember?}', function() {
	return View::make('app');
})->where('ember', '.*');