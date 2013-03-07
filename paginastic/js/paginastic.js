/**
 * paginastic.js
 *
 * paginastic.js is a pagination tool to help developers with UI pagination
 * works in modern browsers.
 *
 *
 * Copyright 2013 Vinicius Santos
 *
 * Released under the MIT and GPL Licenses.
 *
 * ------------------------------------------------
 *  author:  Vinicius Santos
 *  version: 0.0.1
 *  source:  http://github.com/viniciusdsantos/javascript/
 *	requirements: http://jquery.com
 */
 
var Paginastic = {}; //Main Class

function Config( elements ) {//Config Elements to paginate the items
	this.container 			= ( elements.container ) ? elements.container : "paginastic_container";
	this.current_page 		= ( elements.current_page) ? elements.current_page : "paginastic_current_page";	
	this.class_active_page 	= ( elements.class_active_page ) ? elements.class_active_page : "active_page";
	this.show_per_page_id 	= ( elements.show_per_page_id ) ? elements.show_per_page_id : "paginastic_show_per_page";
	this.show_per_page 		= ( elements.show_per_page ) ? elements.show_per_page : 10;
	this.page_navigation 	= ( elements.page_navigation ) ? elements.page_navigation : "paginastic_navigation";
}

Paginastic.Pagination = new function() {

	this.init = function( elements )
	{
		if( elements !== "undefined" && Object.keys(elements).length === 6)
		{
			Paginastic.Configuration = new Config( elements );
		}
		
		var show_per_page 	= elements.show_per_page;
		var number_of_items = $("#" + elements.container + "").children().size();
		var number_of_pages = Math.ceil( number_of_items/show_per_page );
		
		$("#"+ elements.current_page +"").val(0);
		$("#"+ elements.show_per_page_id +"").val( show_per_page );
		
		var navigation_html = "<a class=\"previous_page\" href=\"javascript:Paginastic.Pagination.previousPage();\">Prev</a>";
		var current_link 	= 0;
		
		while(number_of_pages > current_link){		
			navigation_html += "\
				<a class=\"page\" href=\"javascript: Paginastic.Pagination.goToPage("+ current_link +")\" data-page=\""+ current_link +"\">\
					"+(current_link + 1)+"\
				</a>";
			current_link++;
		}
		
		navigation_html += "<a class=\"next_page\" href=\"javascript: Paginastic.Pagination.nextPage();\">Next</a>";
		
		$("#"+ elements.page_navigation +"").html( navigation_html );
		$("#"+ elements.page_navigation +" .page:first").addClass("active_page");
		$("#"+ elements.page_navigation +" .page:first").addClass("first_page");
		$("#"+ elements.page_navigation +" .page:last").addClass("last_page");
		$("#"+ elements.container +"").children().css("display", "none");
		$("#"+ elements.container +"").children().slice(0, show_per_page).css("display", "block");
		
		Paginastic.Pagination.isFirstPage();
	}

	this.previousPage = function()
	{
		var new_page = parseInt($("#"+ Paginastic.Configuration.current_page +"").val()) - 1;
		
		if($(".active_page").prev(".page").length == true)
		{
			Paginastic.Pagination.goToPage( new_page );
		}
		Paginastic.Pagination.isLastPage();
		Paginastic.Pagination.isFirstPage();
	}
	
	this.nextPage = function()
	{
		var new_page = parseInt($("#"+ Paginastic.Configuration.current_page +"").val()) + 1;
		
		if($(".active_page").next(".page").length == true)
		{
			Paginastic.Pagination.goToPage( new_page );
		}
		
		Paginastic.Pagination.isLastPage();
		Paginastic.Pagination.isFirstPage();
	}
	
	this.goToPage = function( page_num )
	{
		var show_per_page 	= parseInt($("#"+ Paginastic.Configuration.show_per_page_id +"").val());
		var start_from 		= page_num * show_per_page;
		var end_on 			= start_from + show_per_page;
		
		$("#"+ Paginastic.Configuration.container +"").children().css("display", "none").slice(start_from, end_on).css("display", "block");
		$(".page[data-page=" + page_num +"]").addClass("active_page").siblings(".active_page").removeClass("active_page");
		$("#"+ Paginastic.Configuration.current_page +"").val( page_num );
		
		Paginastic.Pagination.isLastPage();
		Paginastic.Pagination.isFirstPage();
	}
	
	this.isFirstPage = function()
	{
		if($(".first_page").hasClass("active_page"))
		{
			$(".previous_page").hide();
		} else {
			$(".previous_page").show();
		}
	}
	
	this.isLastPage = function()
	{
		if($(".last_page").hasClass("active_page"))
		{
			$(".next_page").hide();
		} else {
			$(".next_page").show();
		}
	}
}