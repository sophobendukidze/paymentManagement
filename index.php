<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />

    <title>Payment Management</title>
    <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link href="assets/css/perfect-scrollbar.min.css" rel="stylesheet">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <link rel="stylesheet" href="assets/css/styles.css">

</head>
<body>

<header>
    <div id="header">
        <div class="container">
            <div id="logo" class="col-2 header-div">
                <img src="assets/img/logo.png">
            </div>
            <div id="user" class="col-2 header-div"><span>hello user</span></div>
        </div>
    </div>
</header>

<div id="add-payment-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>

        <div class="modal-title">ADD NEW PAYMENT</div>
        <div id="form-payment" class="col col-1">
            <div id="form-panel">
                <div id="title-row" class="col col-3-5">
                    <label class="control-label" for="title">Title</label>
                    <input id="title" name="title" type="text">
                </div>
                <div id="amount-row" class="col col-2-5">
                    <label class="control-label" for="amount">Amount</label>
                    <input id="amount" name="amount" type="number">
                </div>
                <div id="category-row" class="col col-1">
                    <label class="control-label" for="category">Category</label>
                    <select id="category" name="category">
                        <option value=""> </option>
                        <option value="1">mobile services</option>
                        <option value="2">gasoline</option>
                        <option value="3">food</option>
                        <option value="4">charity</option>
                        <option value="5">transport</option>
                    </select>
                </div>
                <div id="date-row" class="col col-1">
                    <label class="control-label" for="date">Date</label>
                    <input id="date" name="date" type="date">
                </div>
                <div id="comment-row" class="col col-1">
                    <label class="control-label" for="comment">Comment</label>
                    <textarea id="comment" name="comment"></textarea>
                </div>
                <div id="submit-row" class="col col-1">
                    <button onclick="addPaymentFunc()" class="btn btn-dark">CREATE</button>
                </div>

            </div>
            <div id="modal-message"></div>

        </div>

    </div>

</div>


<section class="section filters-section">
    <div class="container">
        <div class="filter-panel">
            <div id="add" class="col" onclick="showModal()">
                <img src="assets/img/add.png"> <span>ADD PAYMENT</span>
            </div>
            <div id="more-filters" class="col">
                <button id="more-filters-btn" class="btn">extended filters</button>
            </div>
            <div id="search" class="col">
                <img src="assets/img/search.png">
                <input id="search-input" type="text" placeholder="filter by any property...">
            </div>

        </div>

        <div id="ext-filters-before" class="tringle-border opened"></div>

        <div id="extended-filter" class="filter-panel opened">
            <div id="filter-categories" class="col col-3">
                <div class="row">
                    <span class="category-title">filter by category</span>
                    <ul class="no-list">
                        <li id="mobile" class="category-btn" data-value="1">
                            <a class="btn btn-light">mobile services</a>
                        </li>
                        <li id="gasoline" class="category-btn" data-value="2">
                            <a class="btn btn-light">gasoline</a>
                        </li>
                        <li id="food" class="category-btn" data-value="3">
                            <a class="btn btn-light">food</a>
                        </li>
                        <li id="charity" class="category-btn" data-value="4">
                            <a class="btn btn-light">charity</a>
                        </li>
                        <li id="transport" class="category-btn" data-value="5">
                            <a class="btn btn-light">transport</a>
                        </li>

                    </ul>
                </div>
            </div>
            <div id="filter-dates" class="col col-3">
                <div class="row">
                    <div class="category-title">filter by date</div>

                    <input id="from-date" type="date" placeholder="from">

                    <input id="to-date" type="date" placeholder="to">

                </div>

            </div>
            <div id="filter-amount" class="col col-3">
                <div class="row">
                    <span class="category-title">filter by amount</span>
                    <input id="from-amount" type="text" placeholder="from">

                    <input id="to-amount" type="text" placeholder="to">
                </div>
            </div>

        </div>
    </div>

</section>

<section class="section filtered-content-section">
    <div class="container">
        <div class="col col-1">
            <h2 class="payments-title-h2">Top 5 Payment</h2>
        </div>
        <div id="records-panel" class="col col-3-5 always-visible">
            <div id="records-row" class="row">

                <ul id="record-items" class="record-items">

                </ul>
            </div>
            <div id="records-sum-row" class="row">
                <div id="sum-value">
                    <span id="total">total:</span>
                    <span id="value">99.77</span>
                </div>
            </div>
        </div>

        <div id="charts-panel" class="col col-2-5">
            <div id="charts-container-month" style=" height: 250px; margin: 0 auto">

            </div>
            <div id="charts-container-category" style="height: 250px; margin: 0 auto">

            </div>
        </div>

    </div>

</section>


<footer>

</footer>
<script src="assets/js/jquery.js"></script>
<script src="assets/js/perfect-scrollbar.jquery.js"></script>
<script src="assets/js/scripts.js"></script>
</body>
</html>
