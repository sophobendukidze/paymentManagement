window.onload = function () {
    var online = navigator.onLine;
    if (online) {
        sincronizeData();
    }
    showModal();
    showMoreFilters();
    getPayments(5);
    chartByMonth();
    chartByCategory();
    $('#records-row').perfectScrollbar();

    $('#search-input').keypress(function (e) {
        if (e.which == 13) {
            searchPayment();
        }
    });
    $("#to-date").on("change keyup", function () {
        searchPayment();
    });
    $("#to-amount").on("change keyup", function () {
        searchPayment();
    });


    var category = 0;
    $('.category-btn').click(function () {
        var value = $(this).attr('data-value').toString();
        if ($(this).children('a.btn').hasClass('btn-light')) {
            $(this).children('a.btn').removeClass('btn-light');
            $(this).children('a.btn').addClass('btn-dark');
            searchPayment();

        } else {
            $(this).children('a.btn').removeClass('btn-dark');
            $(this).children('a.btn').addClass('btn-light');
            searchPayment();
        }

    });
};

function searchPayment() {
    var online = navigator.onLine;
    var searchInputVal = document.getElementById('search-input').value;
    var mobServices = ($('#mobile a').hasClass('btn-dark')) ? $('#mobile').attr('data-value') : '';
    var gasoline = ($('#gasoline a').hasClass('btn-dark')) ? $('#gasoline').attr('data-value') : '';
    var food = ($('#food a').hasClass('btn-dark')) ? $('#food').attr('data-value') : '';
    var charity = ($('#charity a').hasClass('btn-dark')) ? $('#charity').attr('data-value') : '';
    var transport = ($('#transport a').hasClass('btn-dark')) ? $('#transport').attr('data-value') : '';
    var fromDate = ($('#from-date').val() != '') ? $('#from-date').val() : '';
    var toDate = ($('#to-date').val() != '') ? $('#to-date').val() : '';
    var fromAmount = ($('#from-amount').val() != '') ? $('#from-amount').val() : '';
    var toAmount = ($('#to-amount').val() != '') ? $('#to-amount').val() : '';
    var categories = "";
    categories = categories + ((mobServices != '') ? '/' + mobServices : '');
    categories = categories + ((gasoline != '') ? '/' + gasoline : '');
    categories = categories + ((food != '') ? '/' + food : '');
    categories = categories + ((charity != '') ? '/' + charity : '');
    categories = categories + ((transport != '') ? '/' + transport : '');
    var SendInfo = {
        searchInputVal: searchInputVal,
        mobServices: mobServices,
        gasoline: gasoline,
        food: food,
        charity: charity,
        transport: transport,
        fromDate: fromDate,
        toDate: toDate,
        fromAmount: fromAmount,
        toAmount: toAmount,
        categories: categories,
        action: 'filterPayment'
    };
    if (online) {
        $.ajax({
            url: "payments.php",
            type: "POST",
            data: SendInfo,
            success: function (data) {
                var jsonData = JSON.parse(data);
                var html = "";
                var sum = 0;
                for (var i = 0; i < jsonData.length; i++) {
                    var id = jsonData[i].id;
                    var title = jsonData[i].title;
                    var amount = jsonData[i].amount;
                    var category = jsonData[i].category;
                    var date = jsonData[i].date;
                    var comment = jsonData[i].comment;
                    sum = sum + parseFloat(amount);
                    html = html + '<li>';
                    html = html + '<div class="col col-2">';
                    html = html + '<span class="payment-title">' + title + '</span>';
                    html = html + '<a class="btn btn-light btn-min">' + category + '</a>';
                    if (comment != '') {
                        html = html + '<div class="comment-row">';
                        html = html + '<span class="comment-title">comment:</span>';
                        html = html + '<span class="comment-text">' + comment + '</span>';
                        html = html + '</div>';
                    }
                    html = html + '</div>';
                    html = html + '<div class="col col-2 col-right">';
                    html = html + '<span class="payment-date">' + date + '</span>';
                    html = html + '<span class="payment-amount">-' + amount + '</span>';
                    html = html + '<span class="payment-currency">gel</span>';
                    html = html + '</div>';
                    html = html + '</li>';
                }
                $('.payments-title-h2').html(jsonData.length + ' records found')
                document.getElementById('record-items').innerHTML = html;
                document.getElementById('value').innerHTML = sum;
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    } else {
        var data = localStorage.getItem('payments');
        var jsonData = JSON.parse(data);
        var sum = 0;
        var html = '';
        var responseList = jsonData;
        var filtered = responseList.filter(filterLocalStorage);
        for (var i = 0; i < filtered.length; i++) {
            var id = filtered[i].id;
            var title = filtered[i].title;
            var amount = filtered[i].amount;
            var category = filtered[i].category;
            var date = filtered[i].date;
            var comment = filtered[i].comment;
            sum = sum + parseFloat(amount);
            html = html + '<li>';
            html = html + '<div class="col col-2">';
            html = html + '<span class="payment-title">' + title + '</span>';
            html = html + '<a class="btn btn-light btn-min">' + category + '</a>';
            if (comment != '') {
                html = html + '<div class="comment-row">';
                html = html + '<span class="comment-title">comment:</span>';
                html = html + '<span class="comment-text">' + comment + '</span>';
                html = html + '</div>';
            }
            html = html + '</div>';
            html = html + '<div class="col col-2 col-right">';
            html = html + '<span class="payment-date">' + date + '</span>';
            html = html + '<span class="payment-amount">-' + amount + '</span>';
            html = html + '<span class="payment-currency">gel</span>';
            html = html + '</div>';
            html = html + '</li>';
        }
        $('.payments-title-h2').html(filtered.length + ' records found');
        document.getElementById('record-items').innerHTML = html;
        document.getElementById('value').innerHTML = sum;

        function filterLocalStorage(obj) {

            var tmpDate = obj['date'] ? new Date(obj['date']).getTime() : null;
            var tmpToDate = toDate ? new Date(toDate).getTime() : null;
            var tmpFromDate = fromDate ? new Date(fromDate).getTime() : null;

            if ((searchInputVal != '' && obj['title'].indexOf(searchInputVal) != -1) ||
                (mobServices != '' && obj['category_id'] == mobServices) ||
                (gasoline != '' && obj['category_id'] == gasoline) ||
                (food != '' && obj['category'] == food) ||
                (charity != '' && obj['category'] == charity) ||
                (transport != '' && obj['category'] == transport) ||
                (tmpDate && tmpToDate && tmpFromDate && tmpDate >= tmpFromDate && tmpDate <= tmpToDate) ||
                (fromAmount != '' && obj['amount'] <= fromAmount && toAmount != '' && obj['amount'] >= toAmount)) {
                return true;
            }
            return false;
        }

    }
}


function showModal() {

    var modal = document.getElementById('add-payment-modal');

    var btn = document.getElementById("add");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        $('#form-panel  input[type="text"]').val('');
        $('#form-panel  input[type="number"]').val('');
        $('#form-panel  input[type="date"]').val('');
        $('#form-panel  select').val('');
        $('#form-panel  textarea').val('');
        $('#modal-message').html('');
        modal.style.display = "block";
    }

    span.onclick = function () {
        $('#form-panel  input[type="text"]').val('');
        modal.style.display = "none";

    }

    window.onclick = function (event) {
        if (event.target == modal) {
            $('#form-panel  input[type="text"]').val('');
            modal.style.display = "none";
        }

    }
}

function showMoreFilters() {
    var filter = document.getElementById('extended-filter');

    var tringle = document.getElementById('ext-filters-before');

    var btn = document.getElementById("more-filters-btn");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        if (filter.classList.contains('opened')) {
            filter.classList.remove("opened");
            tringle.classList.remove("opened");
        } else {
            filter.className += " opened";
            tringle.className += " opened";
        }

    }
}


function addPaymentFunc() {
    var online = navigator.onLine;
    var title = $("#title").val();
    var amount = $("#amount").val();
    var category = $("#category").val();
    var date = $("#date").val();
    var comment = $("#comment").val();
    var SendInfo = {
        title: title,
        amount: amount,
        category: category,
        date: date,
        comment: comment,
        action: 'addPayment'
    };
    if(online){
        $.ajax({
            url: "payments.php",
            type: "POST",
            data: SendInfo,
            success: function (data) {
                var jsonData = JSON.parse(data);
                if (jsonData.success) {
                    $('#modal-message').html('Payment is added');
                } else {
                    $('#modal-message').html('Something went wrong');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $('#modal-message').html('Something went wrong');
                $('#modal-panel').hide();
                setTimeount(function () {
                    $('#add-payment-modal').hide();
                }, 1000);
            }
        });
    }else{
        var localPyments;
        //var localPyments = localStorage.getItem('localPayments');
        if(localStorage.getItem('localPayments')===null){
            localPyments=new Array();
        }else{
            localPyments = JSON.parse(localStorage.getItem('localPayments'));
        }

        localPyments.push([SendInfo]);

        localStorage.setItem('localPayments', JSON.stringify(localPyments));

    }
}

function getPayments(itemNum) {
    var online = navigator.onLine;
    if (online) {
        var SendInfo = {
            itemNum: itemNum,
            action: 'getPayments'
        };

        $.ajax({
            url: "payments.php",
            type: "POST",
            data: SendInfo,
            success: function (data) {
                var jsonData = JSON.parse(data);
                if (itemNum > 0) {
                    var html = "";
                    var sum = 0;
                    for (var i = 0; i < jsonData.length; i++) {
                        var id = jsonData[i].id;
                        var title = jsonData[i].title;
                        var amount = jsonData[i].amount;
                        var category = jsonData[i].category;
                        var date = jsonData[i].date;
                        var comment = jsonData[i].comment;
                        sum = sum + parseFloat(amount);
                        html = html + '<li>';
                        html = html + '<div class="col col-2">';
                        html = html + '<span class="payment-title">' + title + '</span>';
                        html = html + '<a class="btn btn-light btn-min">' + category + '</a>';
                        if (comment != '') {
                            html = html + '<div class="comment-row">';
                            html = html + '<span class="comment-title">comment:</span>';
                            html = html + '<span class="comment-text">' + comment + '</span>';
                            html = html + '</div>';
                        }
                        html = html + '</div>';
                        html = html + '<div class="col col-2 col-right">';
                        html = html + '<span class="payment-date">' + date + '</span>';
                        html = html + '<span class="payment-amount">-' + amount + '</span>';
                        html = html + '<span class="payment-currency">gel</span>';
                        html = html + '</div>';
                        html = html + '</li>';
                    }
                    document.getElementById('record-items').innerHTML = html;
                    document.getElementById('value').innerHTML = sum;
                } else {
                    localStorage.setItem("payments", JSON.stringify(jsonData));
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {

            }
        });
    } else {
        document.getElementById('record-items').innerHTML = 'localData';
    }

}


function sincronizeData() {
    getPayments(0);
    var localPyments;
    if(!(localStorage.getItem('localPayments')===null)){
        localPyments = JSON.parse(localStorage.getItem('localPayments'));
        for(var i=0; i<localPyments.length; i++){
            $.ajax({
                url: "payments.php",
                type: "POST",
                data: localPyments[i][0],
                success: function (data) {
                    var jsonData = JSON.parse(data);
                    if (jsonData.success) {
                        localStorage.removeItem('localPayments');
                    }
                },
                error: function (data) {
                }
            });
        }
    }
}

function chartByMonth() {
    var SendInfo = {
        action: 'chartByMonth'
    };
    var options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Payments per month'
        },
        chartOptions: {
            legend: {
                enabled: false
            }
        },
        xAxis: {
            categories: []
            ,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },
        tooltip: {
            headerFormat: '<table>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: ' ',
            data: []
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    };

    $.ajax({
        url: "payments.php",
        type: "POST",
        data: SendInfo,
        success: function (data) {
            var jsonData = JSON.parse(data);
            options.xAxis.categories = jsonData[0].monthDate;
            options.series[0].data = [35, 40, 55, 100];
            chart = new Highcharts.Chart('charts-container-month', options);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}

function chartByCategory() {
    var SendInfo = {
        action: 'chartByCategory'
    };
    var options = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Payments per category'
        },
        chartOptions: {
            legend: {
                enabled: false
            }
        },
        xAxis: {
            categories: []
            ,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },
        tooltip: {
            headerFormat: '<table>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: ' ',
            data: []
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        }
    };

    $.ajax({
        url: "payments.php",
        type: "POST",
        data: SendInfo,
        success: function (data) {
            var jsonData = JSON.parse(data);
            options.xAxis.categories = jsonData[0].category;
            options.series[0].data = [35, 40, 55, 100];
            chart = new Highcharts.Chart('charts-container-category', options);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });

}