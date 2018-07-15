/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 
		it('has URL', function(){
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBeNull();
			};
		});

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		it('has name', function(){
			for(var i = 0; i < allFeeds.length; i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');
			};
		});
    });


    /* Test suite named 'The menu' */
	describe('The menu', function(){

        /* Test that ensures the menu element is
         * hidden by default. 
         */
		 var body = $('body');
		 it('should be hidden', function(){
			expect(body.hasClass('menu-hidden')).toBe(true);
		 });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
		  var menuButton = $('.menu-icon-link');
		  it('should display when clicked', function(){
			  menuButton.trigger('click');
			  expect(body.hasClass('menu-hidden')).not.toBe(true);
		  });
		  
		  it('should hide when clicked again', function(){
			  menuButton.trigger('click');
			  expect(body.hasClass('menu-hidden')).toBe(true);
		  });
		  
	});

    /* Test suite named 'Initial Entries' */
	describe('Initial Entries', function(){

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
		 var feedIndex = 0;
		 var artTitle = $(".header-title");
		 
		 beforeEach(function(done){
			 loadFeed(feedIndex, function(){
				 done();
			 });
		 });
		 
		 it("should display at least one entry", function(done){
			 var article = $(".feed").find(".entry");
			 expect(article).toBeDefined();
			 expect(article.length).toBeGreaterThan(0);
			 expect(artTitle.text()).toEqual(allFeeds[feedIndex].name);
			 done();
		})
	});

    /* Test suite named 'New Feed Selection' */
	describe('New Feed Selection', function(){

        /* Ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
		 var first, second;
		 
		 beforeEach(function(done){
			 loadFeed(0, function(){
				first = $(".feed").html();
				 loadFeed(1, function(){
					second  = $(".feed").html();
					 done();
				 })
			 });
		 });
		 it('should change', function(){
			 expect(first).not.toBe(second);
		 })
	})

}());
