import { TableHtmlBuilder } from "./TableHtmlBuilder.js";

const MAX_TABLE_RECORDS = 20;

$(function(){
    const tableHtmlBuilder = new TableHtmlBuilder();
    const dataUrl = "http://linkdata.org/api/1/rdf1s2308i/emergency_shelter_kobe_rdf.json?callback=?";
    const $tableContent = $('.table-content');
    const $paginationContent = $('.pagination-content');
    $.getJSON(dataUrl, (dataObj) => {
        let dataList = Object.values(dataObj);
        let firstPage = 1;
        let lastPage = Math.ceil(dataList.length / MAX_TABLE_RECORDS);

        $paginationContent.pagination({
            dataSource: dataList,
            pageSize: MAX_TABLE_RECORDS,
            callback: function(data, pagination) {
                // 現在のページに表示するテーブルのHTML作成
                tableHtmlBuilder.init(data);
                tableHtmlBuilder.build();
                let tableHtml = tableHtmlBuilder.getResult();
                $tableContent.empty();
                $tableContent.html(tableHtml);

                // 最初と最後のページに移動するページアイテムを作成
                let $paginationUl = $('.paginationjs-pages ul');
                
                let $firstPageItems = $('<li>');
                $firstPageItems.addClass('paginationjs-first');
                $firstPageItems.html($('<a>&laquo;</a>'));
                $paginationUl.prepend($firstPageItems);
                $firstPageItems.click(() => {
                    $paginationContent.pagination(firstPage);
                })

                let $lastPageItems = $('<li>');
                $lastPageItems.addClass('paginationjs-last');
                $lastPageItems.html($('<a>&raquo;</a>'));
                $paginationUl.append($lastPageItems);
                $lastPageItems.click(() => {
                    $paginationContent.pagination(lastPage);
                });

                // 最初と最後のページ送りボタンを無効化する
                let currentPageItems = $('.active');
                let currentPage = currentPageItems.data('num');
                if (currentPage === firstPage) {
                    $firstPageItems.addClass('disabled');
                } 
                if (currentPage === lastPage) {
                    $lastPageItems.addClass('disabled');
                }

                // bootstrapのページネーションを適用する
                $paginationUl.addClass('pagination');
                $('.paginationjs-pages ul li').each((index, element) => {
                    $(element).addClass('page-item');
                    $(element).children('a').addClass('page-link');
                });
            }
        });
        
        $paginationContent.addHook('afterRender', function(){
            
        });
    });
});