'use strict';

/*!
 * AngularJS GitHub User Repositories
 * https://github.com/scottnath/angular-picasa-album
 * @license MIT
 * v0.0.1
 */

(function(){

angular.module('angularGithubUserRepos', ['angular-github-user-repos/user-repos.html', 'angularMoment'])
  .directive('githubUserRepos', ['githubService', function(githubService) {
    return {
      //works on attribute
      restrict: 'E',
      replace: true,
      scope: { 
        user: '@',
        limit: '@'
      },
      templateUrl: 'angular-github-user-repos/user-repos.html',
      link: function(scope, element, attrs) {

        scope.$watch('user', function () {
          if (angular.isUndefined(scope.user)) {
          	console.log('no user given');
            scope.githuberror = "No GitHub user provided";
            return;
          }
          if (angular.isUndefined(scope.limit) || !angular.isNumber(scope.limit)) {
            scope.limit = 10;
            console.log(scope.limit);
          }
          githubService.get(scope.user,scope.limit).then(function(data) {
            scope.repos = data;
            scope.ready = true;
          })
        });
        
      }
    };
  }])
  .factory('githubService', ['$http', '$q', function($http, $q) {
    // Service logic

    $http.defaults.useXDomain = true;
    
    function loadUser(user,limit) {
      var d = $q.defer();
      $http.jsonp('https://api.github.com/users/' + user + '/repos?page=1&per_page=' + limit + '&callback=JSON_CALLBACK').success(function(data, status) {
        d.resolve(data);
      });
      return d.promise;
    }

    // Public API here
    return {
      get : function (user,limit) {
        return loadUser(user,limit);
      }
    };
  }]);


  angular.module("angular-github-user-repos/user-repos.html", []).run(["$templateCache", function($templateCache) {
    var userReposTemplate="";
    userReposTemplate += "<div class=\"container github-user-repos\">";
    userReposTemplate += "  <span class=\"error\" ng-show=\"repo.githuberror\">{{githuberror}}<\/span>";
    userReposTemplate += "  <ul class=\"repo-list\">";
    userReposTemplate += "    <li class=\"repo-list-item\" ng-repeat=\"repo in repos.data | orderBy:'updated_at':true\">";
    userReposTemplate += "      <div class=\"repo-list-stats\">";
    userReposTemplate += "        <a class=\"repo-list-stat-item tooltipped tooltipped-s stargazers\" href=\"{{repo.svn_url}}\/stargazers\" aria-label=\"Stargazers\">";
    userReposTemplate += "          <span class=\"octicon octicon-star\"><\/span>";
    userReposTemplate += "          {{repo.stargazers_count}}";
    userReposTemplate += "        <\/a>";
    userReposTemplate += "        <a class=\"repo-list-stat-item tooltipped tooltipped-s forks\" href=\"{{repo.svn_url}}\/network\" aria-label=\"Forks\">";
    userReposTemplate += "          <span class=\"octicon octicon-git-branch\"><\/span>";
    userReposTemplate += "          {{repo.forks}}";
    userReposTemplate += "        <\/a>";
    userReposTemplate += "        <a class=\"repo-list-stat-item tooltipped tooltipped-s watchers\" href=\"{{repo.svn_url}}\/network\" aria-label=\"Forks\">";
    userReposTemplate += "          <span class=\"octicon octicon-eye\"><\/span>";
    userReposTemplate += "          {{repo.watchers}}";
    userReposTemplate += "        <\/a>";
    userReposTemplate += "      <\/div>";
    userReposTemplate += "      <h3 class=\"repo-list-name\">";
    userReposTemplate += "        <a href=\"{{repo.svn_url}}\">{{repo.name}}<\/a>";
    userReposTemplate += "      <\/h3>";
    userReposTemplate += "      <p class=\"repo-list-description\" ng-show=\"repo.description\">{{repo.description}}<\/p>";
    userReposTemplate += "";
    userReposTemplate += "      <p class=\"repo-list-meta\">";
    userReposTemplate += "          Updated <time datetime=\"{{repo.updated_at}}\" is=\"relative-time\" title=\"{{repo.updated_at | amDateFormat:'dddd, MMMM Do YYYY, h:mm:ss a'}}\">{{repo.updated_at | amTimeAgo}}<\/time>";
    userReposTemplate += "      <\/p>";
    userReposTemplate += "";
    userReposTemplate += "    <\/li>";
    userReposTemplate += "  <\/ul>";
    userReposTemplate += "";
    userReposTemplate += "<\/div>";
    userReposTemplate += "";    
    $templateCache.put("angular-github-user-repos/user-repos.html",userReposTemplate);
  }]);

})();
