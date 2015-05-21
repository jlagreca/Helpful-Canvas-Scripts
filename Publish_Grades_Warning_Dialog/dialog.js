$("div.assignment-gradebook-container").after("<div id=\"gradesdialog\" title=\"Warning\"><strong>Warning:</strong> If you have muted any assignments in this course, the final grade to be sent to the SIS will be different from the final grade displayed on the Grades page. To avoid any discrepancy in the SIS grade record, please make sure all assignments are unmuted before you proceed to publish grades to the SIS.</div>");


  $(document).ready(function() {
    $("#gradesdialog").dialog({
      autoOpen: false,
      modal: true
    });
  });

  $("#publish_to_sis").click(function(e) {
    e.preventDefault();
    var targetUrl = $(this).attr("href");

    $("#gradesdialog").dialog({
      buttons : {
        "Publish grades to SIS" : function() {
          window.location.href = targetUrl;
        },
        "Cancel" : function() {
          $(this).dialog("close");
        }
      }
    });

    $("#gradesdialog").dialog("open");
  });