$('.carousel').carousel('cycle',{
    interval: 1000
});
//var url1 = "https://nutriaid-python.herokuapp.com/";
var url1 = "http://localhost:5000";
$(document).ready(function(){
    if (sessionStorage.getItem('user')) {
        // alert(sessionStorage.getItem('user'));
        $("#nav-dashboard-tab").show();
        $("#nav-signout-tab").show();
        $("#nav-signin-tab").hide();
        $("#nav-signup-tab").hide();


    } else {
        $("#nav-dashboard-tab").hide();
        $("#nav-signout-tab").hide();
        $("#nav-signin-tab").show();
    }

    $("#nav-signout-tab").click(function(){
        sessionStorage.clear();
        window.location = "index.html";
    });
    if (sessionStorage.hasOwnProperty('user')) {
        var data1 = {'email': sessionStorage.getItem('user')};
        $.ajax({
            url: "http://localhost:3001/getpreferences",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data1),
            success: function (res) {
                const response = JSON.parse(res);


            }
        }).done(function(res){
            $("#signinModal").modal('hide');
           // console.log('response length='+res);
            res = JSON.parse(res);

            if(res.length == 0) {

                $("#initialsurveyModal").modal('show');
            } else {
                var nutrition_data = [];
                $(res).each(function(i, v){
                    //TODO: Need to find the logic to verify the order of values. As of now, it's in order.
                   // console.log(v.nutrition_name);
                    nutrition_data.push(parseInt(v.nutrition_value));

                });
                console.log(nutrition_data);

                $.ajax({
                    url: 'http://localhost:5000',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify({nutrition: nutrition_data}),
                    success: function(res) {
                       // console.log(res);
                    }

                }).done(function(res){
                   // console.log("done" + res);
                    $('#dashboard_recommend').empty();
                    displayRecommendations(JSON.parse(res));

                });
            }


        });

    } else {
        var method = 'get';
        $.ajax({
            url: url1,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                displayRecommendations(data);

            }
        });
    }

    retrieveFavorites();

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

function displayRecommendations(data) {
    var $row = $('<div>').addClass('row');
    var $column = $('<div>').addClass('col-sm-3');
    /*
    <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
     */
    $.each(data, function(index, val) {

        var fname = val["Food Name"].split(" ")[0].replace(',', '');
        var $div = $('<div>').addClass("card-deck").append(
            $('<img>').addClass("card-img-top").attr("src",'images/thumbs/' + fname + '.jpg'),
            $('<div>').addClass('card-body').append(
                $('<h5>').text(val["Food Name"]).append($('<span>').attr("id","favoriteIcon" + index).click( ()=> {favoriteFood(index,val["Food Name"])}).addClass("fa fa-star")),
                $('<ul>').addClass("list-group list-group-flush").append(
                    $('<li>').addClass('list-group-item').text("Energy (kcal): " + val["Energy (kcal) (kcal)"]),
                    $('<li>').addClass('list-group-item').text("Carbohydrate (g): " + val["Carbohydrate (g)"]),
                    $('<li>').addClass('list-group-item').text("Starch (g): " + val["Starch (g)"]),
                    $('<li>').addClass('list-group-item').text("Glucose (g):" + val["Glucose (g)"]),
                    $('<li>').addClass('list-group-item').text("Cholesterol (mg):" + val["Cholesterol (mg)"]),
                    $('<li>').addClass('list-group-item').text("Fat (g):" + val["Fat (g)"]),
                    $('<li>').addClass('list-group-item').text("Calcium (mg): " + val["Calcium (mg)"]),
                    $('<li>').addClass('list-group-item').text("Iron (mg):" + val["Iron (mg)"]),
                    $('<li>').addClass('list-group-item').text("Protein (g):" + val["Protein (g)"]),
                    $('<li>').addClass('list-group-item').text("Water (g):" + val["Water (g)"]),

                    //)
                ),

            ),
           // $('<a>').attr("data-toggle", "collapse")
             //   .attr("href", "#nutritionlist").text("View Nutrition data").attr('aria-controls', 'nutritionlst'),
            //$('<div>').attr('id', 'nutritionlst').addClass('collapse').append(

        );

        $column.append($div);
        $row.append($column);
        $column = $('<div>').addClass('col-sm-3');
        if (index == 2 || index == 5 || index== 8) {
            $('#dashboard_recommend').append($row);
            $row = $('<div>').addClass('row');
        }

    });



    /*$.each(data, function(index, val) {
        var fname = val["Food Name"].split(" ")[0].replace(',', '')
        var $a = $('<a>').addClass("list-group-item list-group-item-action flex-column align-items-start")
            .append($('<div>').addClass("d-flex w-100 justify-content-between")
                    .append(
                        $('<h5>').text(val["Food Name"]),
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

    });*/
}

function generateInputData(preferences) {
   // console.log(preferences);
}

function savepreferences(){
    var data = {
        user : sessionStorage.getItem('user'),
        water : document.getElementById('waterAmount').value,
        protein : document.getElementById('proteinAmount').value,
        fat : document.getElementById('fatAmount').value,
        carbohydrates : document.getElementById('carbohydratesAmount').value,   
        calories : document.getElementById('caloriesAmount').value,
        starch : document.getElementById('starchAmount').value,
        sugar : document.getElementById('sugarAmount').value,
        glucose : document.getElementById('glucoseAmount').value,
        cholestrol : 0,
        calcium : document.getElementById('calciumAmount').value,
        iron : document.getElementById('ironAmount').value,
    }
    $.ajax({
        url: "http://localhost:3001/savepreferences",
        type: 'POST',
        contentType: 'application/json',

        data: JSON.stringify(data),
    
        success: function (data) {

            console.log("Successfully Saved Preferences");
        }
    })
}


function favoriteFood(index, food)
{
  
    if(!($('#favoriteIcon'+index).hasClass("checked")))
    {
        $("#favoriteIcon"+index).addClass("checked");

        var favoriteData={
            user : sessionStorage.getItem('user'),
            food : food
        }
            $.ajax({
            url: "http://localhost:3001/favorite",
            type: 'POST',
            contentType: 'application/json',

            data: JSON.stringify(favoriteData),
        
            success: function (data) {

                console.log("Successfully Favorited");
                retrieveFavorites();
            }
        })
    }
}


function removeFavorite(index, food)
{
    console.log(food);
    var info={
        user : sessionStorage.getItem('user'),
        food : food
    }
        $.ajax({
        url: "http://localhost:3001/remove-favorite",
        type: 'POST',
        contentType: 'application/json',

        data: JSON.stringify(info),
    
        success: function (data) {

            console.log("Successfully Removed From Favorite");
            retrieveFavorites();
        }
    })
}

function retrieveFavorites()
    {
        console.log('retreiving favs');
    $.ajax({
        url: 'http://localhost:3001/favorite-foods',
        type: 'POST',
        dataType: 'json',
        data: {
            email : sessionStorage.getItem('user')
        },
        success: function (response) {
            $('#favoriteTable tbody').empty();
            console.log(response.length);
            for(var i = 0; i<response.length; i++)
            {
              var id = "favListIcon"+i; 
              $('#favoriteTable').append('<tr><td>'+response[i]["Food Name"]+'</td><td>' + response[i]["Protein"] + '</td><td>' + response[i]["Fat"] +'</td><td>' + response[i]["Carbohydrate"] + '</td><td>' + response[i]["Total Sugars"] + '</td><td><span class="fa fa-star checked"  id="' + id + '" ></span></td></tr>');
              var idselector = "#" + id;
              console.log(idselector);
              console.log(response[i]['Food Name']);
              $(idselector).click(function handle() { console.log(response[id.split('n')[1]]['Food Name']) ; removeFavorite(id,response[id.split('n')[1]]['Food Name']+"")});
            }
        }
    })
};