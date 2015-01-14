Angular GitHub User Repositories
=====================

Simple AngularJS module to show a user's public GitHub repositories

## What it does

Creates a basic list of a user's GitHub *public* repositories which mimics the styling of GitHubs list of repositories.

## Usage

### Dependency in your app

You will need to include ```angularGithubUserRepos``` in your list of app dependencies:

```
'use strict';

angular.module('angularApp', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngRoute', 'angularGithubUserRepos'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
	  	...
```

### Using the directive in your html

```<github-user-repos user="scottnath" limit="15"></github-user-repos>```

### Styling

You must include both the octocons.css (bower_components/octicons/octicons/octicons.css) and the angular-github-user-repos.css files for this to look correct and include all icons.

## Options

### user

Type: `String`

This should be a valid GitHub username. *Module will fail without this attribute.*

Default: *none*

### limit

Type: `Num`

This option allows you to limit the number of results returned.

Default: `10`
