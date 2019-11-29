$('.carousel').carousel('cycle',{
    interval: 1000
});
var url1 = "https://nutriaid-python.herokuapp.com/";
$(document).ready(function(){
    if (sessionStorage.getItem('user')) {
        // alert(sessionStorage.getItem('user'));
        $("#nav-dashboard-tab").show();
        $("#nav-signout-tab").show();
        $("#nav-signin-tab").hide();


    } else {
        $("#nav-dashboard-tab").hide();
        $("#nav-signout-tab").hide();
        $("#nav-signin-tab").show();
    }

    $("#nav-signout-tab").click(function(){
        sessionStorage.clear();
        window.location = "index.html";
    });

    $.ajax({
        url: url1,
        type: 'get',
        //  data: JSON.stringify(sendinfo),
        //  contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $.each(data, function(index, val) {
                var fname = val["Food Name"].split(" ")[0].replace(',', '')
                console.log(fname);

                var $a = $('<a>').addClass("list-group-item list-group-item-action flex-column align-items-start")
                    .append($('<div>').addClass("d-flex w-100 justify-content-between")
                            .append(
                                $('<h5>').text(val["Food Name"]),
                                //  $('<small>').text("3 days ago")

                            ),
                        $('<img>').attr("src",'images/thumbs/' + fname + '.jpg'),
                        //  $('<p>').addClass("mb-1").text("Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit."),
                        $('<ul>').addClass("mb-1").append(
                            $('<li>').text("Energy (kcal): " + val["Energy (kcal) (kcal)"]),
                            $('<li>').text("Carbohydrate (g): " + val["Carbohydrate (g)"]),
                            $('<li>').text("Starch (g): " + val["Starch (g)"]),
                            $('<li>').text("Glucose (g):" + val["Glucose (g)"]),
                            $('<li>').text("Cholesterol (mg):" + val["Cholesterol (mg)"]),
                            $('<li>').text("Fat (g):" + val["Fat (g)"]),
                            $('<li>').text("Calcium (mg): " + val["Calcium (mg)"]),
                            $('<li>').text("Iron (mg):" + val["Iron (mg)"]),
                            $('<li>').text("Protein (g):" + val["Protein (g)"]),
                            $('<li>').text("Water (g):" + val["Water (g)"]),

                        )


                    );

                $('#dashboard_recommend').append($a);

            });

        }
    });

});

google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Nutrients', 'Energy (in calories)'],
        ['Energy', 13], ['Carbohydrates', 83], ['Starch', 1.4],
        ['Fat', 2.3], ['Glucose', 46], ['Cholestrol', 300],
        ['Calcium', 300],['Protein', 300],['Iron', 300],['Water', 300]
    ]);

    var options = {
        title: 'Nutrients % in Diet',
        width:1000,
        height:500,
        legend: 'none',
        pieSliceText: 'label',
        slices: {  4: {offset: 0.2},
            12: {offset: 0.3},
            14: {offset: 0.4},
            15: {offset: 0.5},
        },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}