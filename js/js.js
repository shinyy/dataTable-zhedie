
	
/* Formatting function for row details - modify as you need */
function format ( d ) {
    // `d` is the original data object for the row
	
    /*return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';*/
	
	/*return '<table class="display example" cellspacing="0" width="100%" border="1" borderColor="#dddddd">'+
        '<tbody><tr role="row" class="markTr"><td class="details-control sp"></td><td colspan="4">大床房</td></tr><tr class="hideTr">'+
            
            '<td>9月13日</td><td>1</td><td>1</td><td>1</td><td>1</td>'+
        '</tr><tr class="hideTr"><td>9月14日</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>'+
		
		'<tr role="row"  class="markTr"><td class="details-control sp"></td><td colspan="4">小床房</td></tr><tr class="hideTr">'+
            
            '<td>9月13日</td><td>1</td><td>1</td><td>1</td><td>1</td>'+
        '</tr><tr class="hideTr"><td>9月14日</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>'+
       
    '</tbody></table>';*/
	
	return '<table class="display example" cellspacing="0" width="100%" border="1" borderColor="#dddddd">'+
        '<tbody><tr role="row" class="markTr"><td class="details-control sp" rowspan="1"></td><td class="roomType" >大床房</td><td>9月13日</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>'+
        '<tr class="hideTr"><td>9月14日</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>'+
		
		'<tr role="row"  class="markTr"><td class="details-control sp" rowspan="1" ></td><td class="roomType" >小床房</td><td>9月13日</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>'+
        '<tr class="hideTr"><td>9月14日</td><td>2</td><td>2</td><td>2</td><td>2</td></tr>'+
       
    '</tbody></table>';
}
$(document).ready(function() {
    var table = $('.example').DataTable( {
        "ajax": "../ajax/data/objects.txt",
        "columns": [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "salary" }
        ],
        "order": [[1, 'asc']]
    } );
    // Add event listener for opening and closing details
    /*$('.example>tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );*/
	
	
	
	var clickNum=0;
	$('.example>tbody').on('click', 'td.details-control', function () {
		//alert($(this).next().text())
		if($(this).hasClass('sp')){
			$(this).parent("tr").toggleClass("shown");
			$(this).parent("tr").nextUntil(".markTr","tr").toggle();
			
			
			if($(this).attr("rowspan")==1){
				$(this).attr("rowspan","2");
			    $(this).siblings(".roomType").attr("rowspan","2");
				
				}else{
					$(this).attr("rowspan","1");
			        $(this).siblings(".roomType").attr("rowspan","1");
					
					};
			
			}else{
					
				    var tr = $(this).closest('tr');
					var row = table.row( tr );
					if ( row.child.isShown() ) {
						// This row is already open - close it
						row.child.hide();
						tr.removeClass('shown');
						
					}
					else {
						// Open this row
						row.child( format(row.data()) ).show();
						tr.addClass('shown');
						/*$(this).parent("tr").nextUntil(".markTr","tr").show();*/
					}
				}
       
    } );
	
	$('.example').on('click','td',function(){
		
		if($(this).parent('tr').hasClass('odd')||$(this).parent('tr').hasClass('even')||$(this).parent('tr').hasClass('markTr')){
			$(this).siblings('.details-control').click();
			}
		})
	
	
} );