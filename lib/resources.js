function get_google_doc_data(doc_id){
  var doc_url = "https://docs.google.com/spreadsheet/pub?key=" + doc_id + "&output=csv";
  return $.ajax({
      url: doc_url
  });
}

function populate_table(doc_name, table_el, count_el, template, dt_sorting, dt_columns, search_qs){
  $.when(get_csv_data(doc_name)).then(
    function(csv){
      var json = $.csv.toObjects(csv);
      var data_count = 0;
      $.each(json, function(i, obj){
          if(obj.title != ""){
            data_count++;
            $("#" + table_el + " tbody").append(Mustache.render(template, obj));
          }
      });

      $('#' + count_el).html(data_count);

      // initialize datatables
      var data_table = $('#' + table_el).dataTable( {
        "aaSorting": dt_sorting,
        "aoColumns": dt_columns,
        "bInfo": false,
        "bPaginate": false
      });

      // allows linking directly to searches
      if ($.address.parameter(search_qs) != undefined) {
        data_table.fnFilter( $.address.parameter(search_qs) );
        $('#' + table_el + '_filter input').ScrollTo();
      }

      // when someone types a search value, it updates the URL
      $('#' + table_el + '_filter input').keyup(function(e){
        $.address.parameter(search_qs, $('#' + table_el + '_filter input').val());
        return false;
      });
    }
  )
}

// populate other open data list
var data_template = "\
<tr>\
  <td>\
    <h4><a href='{{url}}'>{{title}}</a></h4>\
  </td>\
  <td>{{category}}</td>\
  <td>\
    <p>{{description}}</p>\
    <ul class='list-inline link-list'>\
      <li><a href='{{link_url_1}}'>{{link_name_1}}</a></li>\
      <li><a href='{{link_url_2}}'>{{link_name_2}}</a></li>\
      <li><a href='{{link_url_3}}'>{{link_name_3}}</a></li>\
    </ul>\
  </td>\
</tr>\
";

populate_table("0Ap0CEAgs-R_odFR1cTRoM2l2dnVPRWZBaWJldVVIa3c", "open-data-table", "data-count", data_template, [ [1,'asc'] ], [ null, null, null ], 'data-search');	

-		+// populate free developer infrastructure
/-// populate free developer infrastructure		+// var infrastructure_template = "\
//-var infrastructure_template = "\		+// <tr>\
//-<tr>\		+//   <td>\
//-  <td>\		+//     <h4><a href='{{url}}'>{{title}}</a></h4>\
//-    <h4><a href='{{url}}'>{{title}}</a></h4>\		+//   </td>\
//-  </td>\		+//   <td>{{provider}}</td>\
//-  <td>{{provider}}</td>\		+//   <td>\
//-  <td>\		+//     <p>{{description}}</p>\
//-    <p>{{description}}</p>\		+//   </td>\
//-  </td>\		+// </tr>\
//-</tr>\		+// ";
//-";		+
//-		+//populate_table("0AtbqcVh3dkAqdEw1NTNzZ0JuTGVrRkFYUWFhWG1ma2c", "developer-infrastructure-table", "infrastructure-count", infrastructure_template, [ [0,'asc'] ], [ null, null, null ], 'tools-search'); 
//-populate_table("0Ap0CEAgs-R_odFJFSjh1UGVJRGZaeVBsZEVpNlFwQ1E", "developer-infrastructure-table", "infrastructure-count", infrastructure_template, [ [0,'asc'] ], [ null, null, null ], 'tools-search');
