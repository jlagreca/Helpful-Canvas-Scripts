// Checks that current user role is is a teacher, Admins can see the buttons. Also allows Admins who are also Teachers 
// to see the buttons. You many need to adjust the current user role name and ID to match the exceptions for your institution.
// You also may need to comment out buttons that you want to allow your teachers to see.
$(document).ready(function(){ 
if($.inArray('teacher',ENV['current_user_roles']) === 1 && $.inArray('admin',ENV['current_user_roles']) === 2 )
{
 //$('a.btn.button-sidebar-wide.reset_course_content_button').show();
 //$("a:contains('Conclude this Course')").show();
 //$('a.btn.button-sidebar-wide.delete_course_link').show();
      
    }
else if
  ($.inArray('admin',ENV['current_user_roles']) === 1 ) {
   //     $('a.btn.button-sidebar-wide.reset_course_content_button').show();
   //    $("a:contains('Conclude this Course')").show();
   //    $('a.btn.button-sidebar-wide.delete_course_link').show();
     
    } 
else {
    //($.inArray('teacher',ENV['current_user_roles']) === 1 )
       // $('a.btn.button-sidebar-wide.reset_course_content_button').hide();
       // $("a:contains('Conclude this Course')").hide();


    }
});


